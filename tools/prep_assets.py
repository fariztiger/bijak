#!/usr/bin/env python3
"""Prepare web-optimized assets for the BIJAK website from the sealed Vol 01 baseline.
Reads from /home/user/bijak-4m (read-only), writes to /home/user/bijak-web/assets/img/.
Also builds the free sample PDF (deliberately selected pages only)."""
import os, io
import pymupdf
from PIL import Image

BASE = "/home/user/bijak-4m"
OUT = "/home/user/bijak-web/assets/img"
SAMPLES = "/home/user/bijak-web/samples"
os.makedirs(OUT, exist_ok=True)
os.makedirs(SAMPLES, exist_ok=True)

def save_jpg(src, dst, max_w=900, q=82):
    im = Image.open(src).convert("RGB")
    if im.width > max_w:
        im = im.resize((max_w, int(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(dst, "JPEG", quality=q, optimize=True)
    print(f"  {os.path.basename(dst):34s} {im.width}x{im.height}  {os.path.getsize(dst)//1024} KB")

print("== mascot (transparent, 480px) ==")
im = Image.open(f"{BASE}/illustrations/tiger-bijak-mascot.png").convert("RGBA")
# make near-white background transparent (threshold >240 per channel)
px = im.load()
w, h = im.size
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if r > 240 and g > 240 and b > 240:
            px[x, y] = (r, g, b, 0)
im.thumbnail((480, 480), Image.LANCZOS)
im.save(f"{OUT}/tiger-bijak-mascot.png", optimize=True)
print(f"  mascot {im.size} {os.path.getsize(f'{OUT}/tiger-bijak-mascot.png')//1024} KB")

print("== hero + spot illustrations ==")
save_jpg(f"{BASE}/illustrations/v2/v2_hero.png", f"{OUT}/hero.jpg", 1200)
save_jpg(f"{BASE}/illustrations/v2/v2_thinking.png", f"{OUT}/ill-thinking.jpg", 700)
save_jpg(f"{BASE}/illustrations/v2/v2_celebrate.png", f"{OUT}/ill-celebrate.jpg", 700)
save_jpg(f"{BASE}/illustrations/v2/v2_shop.png", f"{OUT}/ill-shop.jpg", 700)
save_jpg(f"{BASE}/illustrations/v2/v2_treasure.png", f"{OUT}/ill-treasure.jpg", 700)
save_jpg(f"{BASE}/illustrations/v2/v2_trampoline.png", f"{OUT}/ill-trampoline.jpg", 700)
save_jpg(f"{BASE}/illustrations/v2/v2_hands_all.png", f"{OUT}/ill-hands.jpg", 700)

print("== product covers (rendered from final PDFs) ==")
covers = {
    "cover-warna.jpg": f"{BASE}/output/BIJAK_Jilid01_Sifir_1-12_Warna_V2.0.pdf",
    "cover-ink.jpg": f"{BASE}/output/BIJAK_Jilid01_Sifir_1-12_InkSaving_V2.0.pdf",
    "cover-jawapan.jpg": f"{BASE}/output/BIJAK_Jilid01_Sifir_1-12_BukuJawapan_V2.0.pdf",
    "cover-guru.jpg": f"{BASE}/output/BIJAK_Jilid01_Sifir_1-12_PanduanGuru_V2.0.pdf",
}
for name, pdf in covers.items():
    doc = pymupdf.open(pdf)
    pix = doc[0].get_pixmap(dpi=100)
    img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    img.thumbnail((620, 900), Image.LANCZOS)
    img.save(f"{OUT}/{name}", "JPEG", quality=84, optimize=True)
    print(f"  {name:34s} {img.size} {os.path.getsize(f'{OUT}/{name}')//1024} KB  ({doc.page_count} pp)")

print("== sample pages (Warna, selected) ==")
doc = pymupdf.open(f"{BASE}/output/BIJAK_Jilid01_Sifir_1-12_Warna_V2.0.pdf")
# Verified page map (text-probed 2026-11-25):
#   p1  cover
#   p8  Unit 1 M1+M2 (Sifir 2,5,10)
#   p9  M3 Strategi & Petua
#   p10 M4 A
#   p11 M4 B
#   p12 MAIN game
#   p13 SEMAK
#   p62 Papan Sifir
#   p63 BONUS Maze Sifir 7 (MULA -> GAWANG)
#   p64 Kertas Kerja
#   p65 SELESAI Nota Akhir
picks = {
    "sample-cover.jpg": 0,    # p1  cover
    "sample-m1m2.jpg": 7,     # p8  M1+M2 concept pages
    "sample-m3.jpg": 8,       # p9  M3 strategies & tips
    "sample-m4.jpg": 9,       # p10 M4 stage A
    "sample-main.jpg": 11,    # p12 main game activity
    "sample-maze.jpg": 62,    # p63 bonus maze (single solution)
    "sample-back.jpg": 64,    # p65 closing notes
}
for name, pno in picks.items():
    pix = doc[pno].get_pixmap(dpi=100)
    img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    img.thumbnail((820, 1200), Image.LANCZOS)
    img.save(f"{OUT}/{name}", "JPEG", quality=82, optimize=True)
    print(f"  {name:34s} p{pno+1} {img.size} {os.path.getsize(f'{OUT}/{name}')//1024} KB")

print("== free sample PDF (selected pages only, watermarked, compressed) ==")
W, H = 595.27, 841.89  # A4 points
new = pymupdf.open()
for name in picks:
    page = new.new_page(width=W, height=H)
    img = Image.open(f"{OUT}/{name}")
    w = W - 72
    h = w * img.height / img.width
    if h > H - 110:
        h = H - 110
        w = h * img.width / img.height
    x = (W - w) / 2
    y = 64
    page.insert_image(pymupdf.Rect(x, y, x + w, y + h), filename=f"{OUT}/{name}")
    page.insert_text((36, 30), "SAMPEL PERCUMA  |  FREE SAMPLE — BIJAK 4M Jilid 01 V2.0",
                     fontsize=9, color=(0.055, 0.486, 0.42))
    page.insert_text((36, H - 20),
                     "Sampel terpilih sahaja. Buku penuh: 66 muka surat.  |  Selected pages only. Full book: 66 pages.",
                     fontsize=7.5, color=(0.36, 0.447, 0.404))
new.set_metadata({"title": "BIJAK 4M Jilid 01 — Sampel Percuma / Free Sample",
                  "author": "BIJAK Production", "subject": "Selected sample pages"})
out_pdf = f"{SAMPLES}/BIJAK_Sample_Vol01.pdf"
new.save(out_pdf, garbage=3, deflate=True)
print(f"  {out_pdf}  {new.page_count} pages  {os.path.getsize(out_pdf)//1024} KB")
print("DONE")

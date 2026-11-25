/* DOM-level test of the BIJAK website (jsdom) — no browser required */
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = '/home/user/bijak-web';
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');

const vc = new VirtualConsole();
vc.on('jsdomError', e => { if (!/Could not load|not implemented/i.test(String(e.message))) console.error('JSDOM ERROR:', e.message); });

const dom = new JSDOM(html, {
  url: 'http://localhost/bijak/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
  virtualConsole: vc,
  resources: 'usable'
});
const { window } = dom;
window.matchMedia = window.matchMedia || function(q){ return { matches: false, addListener(){}, removeListener(){} }; };
window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };

// load the three scripts in order
['assets/js/i18n.js', 'assets/js/lab4m.js'].forEach(rel => {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf-8');
  window.eval(src);
});
// extract and run the inline script
const m = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/);
window.eval(m[1]);

const doc = window.document;
let pass = 0, fail = 0;
function ok(cond, label){
  if(cond){ pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label); }
}
function click(el){ el.dispatchEvent(new window.MouseEvent('click', {bubbles:true})); }

console.log('== Boot ==');
ok(window.LANG === 'MS', 'default language is MS');
ok(doc.title.includes('BIJAK'), 'title set: ' + doc.title);
ok(doc.querySelectorAll('[data-i18n]').length > 60, 'i18n keys applied to DOM');
ok(doc.querySelector('.station.active').getAttribute('data-m') === '1', 'M1 station active by default');
ok(doc.querySelector('#lab-score').textContent === 'Markah: 0 / 0', 'initial score label: ' + doc.querySelector('#lab-score').textContent);

console.log('== Language switch EN ==');
click(doc.getElementById('lang-en'));
ok(window.LANG === 'EN', 'LANG is EN');
ok(doc.title.includes('Digital Experience'), 'EN title: ' + doc.title);
ok(doc.querySelector('[data-i18n="cta1.t"]').textContent.includes('Free'), 'EN CTA text: ' + doc.querySelector('[data-i18n="cta1.t"]').textContent);
ok(doc.querySelector('html').getAttribute('lang') === 'en', 'html lang=en');

console.log('== M1 quiz ==');
click(doc.getElementById('lang-ms')); // back to MS for deterministic test
const m1opts = doc.querySelectorAll('#station-m1 .opts .opt');
ok(m1opts.length === 4, 'M1 has 4 options');
ok(/^\d+$/.test(m1opts[0].textContent), 'M1 option is a number');
// correct answer = total apples shown (groups x per)
const apples = doc.querySelectorAll('#station-m1 .group .apple').length;
const correct = apples;
const correctBtn = [...m1opts].find(b => Number(b.textContent) === correct);
ok(!!correctBtn, `M1 correct answer ${correct} present (${doc.querySelectorAll('#station-m1 .group').length} groups)`);
click(correctBtn);
ok(correctBtn.classList.contains('correct'), 'M1 correct marked');
ok(doc.querySelector('#station-m1 .feedback.good') !== null, 'M1 good feedback shown');
ok(doc.querySelector('#lab-score').textContent.includes('1 / 1'), 'score updated: ' + doc.querySelector('#lab-score').textContent);

console.log('== M2 quiz ==');
click(doc.getElementById('tab-m2'));
ok(doc.querySelector('#station-m2').classList.contains('active'), 'M2 station active');
const m2dots = doc.querySelectorAll('#station-m2 .array .dot').length;
const m2opts = [...doc.querySelectorAll('#station-m2 .opts .opt')];
ok(m2opts.some(b => Number(b.textContent) === m2dots), `M2 correct (${m2dots}) present among options`);
click(m2opts.find(b => Number(b.textContent) === m2dots));
ok(doc.querySelector('#station-m2 .feedback.good') !== null, 'M2 good feedback');

console.log('== M3 quiz ==');
click(doc.getElementById('tab-m3'));
const q3 = doc.querySelector('#station-m3 .stage .q').textContent;
ok(/^\d+ × \d+$/.test(q3), 'M3 question format: ' + q3);
const [a, b] = q3.split(' × ').map(Number);
const m3opts = [...doc.querySelectorAll('#station-m3 .opts .opt')];
ok(m3opts.some(o => Number(o.textContent) === a*b), `M3 correct (${a*b}) present`);

console.log('== M4 problem + maze ==');
click(doc.getElementById('tab-m4'));
const q4 = doc.querySelector('#station-m4 .stage .q').textContent;
ok(/kumpulan/.test(q4) && /jumlah keseluruhan/.test(q4), 'M4 MS question: ' + q4);
const m4opts = [...doc.querySelectorAll('#station-m4 .opts .opt')];
const m4dots = doc.querySelectorAll('#station-m4 .maze button').length;
ok(m4dots === 56, 'maze grid has 56 cells (8x7)');
ok(doc.querySelector('#station-m4 .maze .start') !== null, 'maze start cell present');
ok(doc.querySelector('#station-m4 .maze .goal') !== null, 'maze goal cell present');
// uniqueness check: path row values 7..56 on row 3
const row3 = [...doc.querySelectorAll('#station-m4 .maze button')].filter(b => Number(b.dataset.y) === 3);
ok(row3.length === 8, 'row 3 has 8 cells');
ok(row3[0].classList.contains('start') && Number(row3[7].textContent) === 56, 'start=7..goal=56 on row 3');
// wrong first click: click a cell not adjacent to start
const far = [...doc.querySelectorAll('#station-m4 .maze button')].find(b => !b.classList.contains('start') && !b.classList.contains('goal') && Number(b.dataset.x) >= 4);
click(far);
ok(far.classList.contains('blocked'), 'wrong maze move blocked');
ok(doc.querySelector('#station-m4 .maze .feedback, #station-m4 .feedback.bad') !== null, 'maze wrong feedback');
// solve the maze: click cells along row 3 left-to-right
for(let x = 1; x <= 7; x++){
  const cell = [...doc.querySelectorAll('#station-m4 .maze button')].find(b => Number(b.dataset.x) === x && Number(b.dataset.y) === 3);
  click(cell);
}
const solved = doc.querySelector('#station-m4 .maze-area .feedback.good');
ok(solved !== null, 'maze solved with correct path');

console.log('== Flip samples ==');
const before = doc.getElementById('flip-img').getAttribute('src');
click(doc.getElementById('flip-next'));
ok(doc.getElementById('flip-img').getAttribute('src') !== before, 'flip advances to next sample');
ok(doc.getElementById('flip-pageno').textContent === '2', 'page counter = 2');
click(doc.getElementById('flip-prev'));
ok(doc.getElementById('flip-pageno').textContent === '1', 'flip wraps back to 1');

console.log('== Enquiry form ==');
doc.getElementById('f-name').value = 'Test Parent';
doc.getElementById('f-email').value = 'test@example.com';
doc.getElementById('f-role').value = 'parent';
doc.getElementById('f-interest').value = 'p1';
doc.getElementById('enquiry-form').dispatchEvent(new window.Event('submit', {bubbles:true, cancelable:true}));
ok(doc.getElementById('enquiry-ok').hidden === false, 'enquiry success message shown');

console.log('== Assets ==');
const fs2 = require('fs');
['assets/css/style.css','assets/js/i18n.js','assets/js/lab4m.js','assets/img/tiger-bijak-mascot.png','samples/BIJAK_Sample_Vol01.pdf','assets/img/sample-cover.jpg','assets/img/cover-warna.jpg','assets/img/cover-ink.jpg','assets/img/cover-jawapan.jpg','assets/img/cover-guru.jpg','assets/img/hero.jpg','assets/img/sample-m1m2.jpg','assets/img/sample-m3.jpg','assets/img/sample-m4.jpg','assets/img/sample-main.jpg','assets/img/sample-maze.jpg','assets/img/sample-back.jpg'].forEach(rel => {
  ok(fs2.existsSync(path.join(ROOT, rel)), 'asset exists: ' + rel);
});

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);

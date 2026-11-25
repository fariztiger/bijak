/* ============================================================
   BIJAK 4M — Interactive lab engine
   Faithful adaptations of verified Vol 01 activities:
   - M1: concept intro (grouped items -> product)
   - M2: array visualisation
   - M3: times-table strategies (2,5,10 pattern + 3x7)
   - M4: mastery problem + single-solution times-table maze
   No personal data collected. No payment. Honest feedback.
   ============================================================ */
(function(){
  const q = sel => document.querySelector(sel);
  const labRoot = q('#lab');
  if(!labRoot) return;
  let score = 0, total = 0, motion = (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) ? false : true;

  // ---------- helpers ----------
  function shuffle(arr){
    const a = arr.slice();
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function el(tag, cls, html){
    const e = document.createElement(tag);
    if(cls) e.className = cls;
    if(html !== undefined) e.innerHTML = html;
    return e;
  }
  function setMascot(text, mood){
    const m = q('.lab-mascot');
    if(m){ m.className = 'lab-mascot' + (mood ? ' mood-' + mood : ''); m.textContent = text; }
  }
  function setScore(){
    const s = q('#lab-score');
    if(s) s.textContent = t('lab.score') + ': ' + score + ' / ' + total;
  }

  // ---------- M1: Memahami — concept of product via groups ----------
  function m1Round(){
    const groups = [2,3,4,5][Math.floor(Math.random()*4)];
    const per = [4,5,6][Math.floor(Math.random()*3)];
    const answer = groups * per;
    const wrongs = [answer-3, answer-4, answer+1, answer+5, answer+7, answer+10]
      .filter(v => v > 0 && v !== answer)
      .filter((v,i,a) => a.indexOf(v) === i).slice(0,3);
    const opts = shuffle([answer, ...wrongs]);

    const stage = el('div','stage');
    stage.appendChild(el('div','q', t('lab.m1.q')));
    const g = el('div','groups');
    for(let i = 0; i < groups; i++){
      const grp = el('div','group');
      for(let j = 0; j < per; j++) grp.appendChild(el('div','apple'));
      g.appendChild(grp);
    }
    stage.appendChild(g);
    stage.appendChild(el('div','lead-sm', t('lab.m1.sub')));

    const fb = el('div','feedback');
    const optWrap = el('div','opts');
    opts.forEach(v => {
      const b = el('button','opt', String(v));
      b.type = 'button';
      b.addEventListener('click', function(){
        if(b.dataset.done) return;
        b.dataset.done = '1';
        total++;
        if(Number(b.textContent) === answer){
          score++; b.classList.add('correct'); fb.textContent = t('lab.m1.fb.good');
          fb.className = 'feedback good'; setMascot(t('lab.m1.fb.good').slice(0,42),'happy');
        } else {
          b.classList.add('wrong'); fb.textContent = t('lab.m1.fb.bad');
          fb.className = 'feedback bad'; setMascot(t('lab.m1.fb.bad').slice(0,42),'think');
          opts.forEach(o => { if(Number(o.textContent) === answer) o.classList.add('correct'); });
        }
        optWrap.querySelectorAll('button').forEach(x => x.disabled = true);
        setScore();
      });
      optWrap.appendChild(b);
    });
    stage.appendChild(optWrap); stage.appendChild(fb);
    q('.station[data-m="1"] .stage-area').innerHTML = '';
    q('.station[data-m="1"] .stage-area').appendChild(stage);
  }

  // ---------- M2: Memvisualisasi — arrays ----------
  function m2Round(){
    const rows = [2,3,4][Math.floor(Math.random()*3)];
    const cols = [3,4,5][Math.floor(Math.random()*3)];
    const answer = rows * cols;
    const wrongs = [answer+rows, answer+1, answer+cols]
      .filter((v,i,a) => a.indexOf(v) === i);
    const opts = shuffle([answer, ...wrongs]);

    const stage = el('div','stage');
    stage.appendChild(el('div','q', t('lab.m2.q')));
    const arr = el('div','array');
    arr.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    for(let i = 0; i < answer; i++){
      const dot = el('div','dot');
      if(motion && i < rows*2) dot.style.opacity = '0.25';
      arr.appendChild(dot);
    }
    stage.appendChild(arr);
    stage.appendChild(el('div','lead-sm', t('lab.m2.sub')));

    const fb = el('div','feedback');
    const optWrap = el('div','opts');
    opts.forEach(v => {
      const b = el('button','opt', String(v));
      b.type = 'button';
      b.addEventListener('click', function(){
        if(b.dataset.done) return;
        b.dataset.done = '1'; total++;
        if(Number(b.textContent) === answer){
          score++; b.classList.add('correct'); fb.textContent = t('lab.m2.fb.good');
          fb.className = 'feedback good'; setMascot(t('lab.m2.fb.good').slice(0,42),'happy');
          arr.querySelectorAll('.dot').forEach((d,i) => d.classList.add('hl'));
        } else {
          b.classList.add('wrong'); fb.textContent = t('lab.m2.fb.bad');
          fb.className = 'feedback bad'; setMascot(t('lab.m2.fb.bad').slice(0,42),'think');
          opts.forEach(o => { if(Number(o.textContent) === answer) o.classList.add('correct'); });
        }
        optWrap.querySelectorAll('button').forEach(x => x.disabled = true);
        setScore();
      });
      optWrap.appendChild(b);
    });
    stage.appendChild(optWrap); stage.appendChild(fb);
    q('.station[data-m="2"] .stage-area').innerHTML = '';
    q('.station[data-m="2"] .stage-area').appendChild(stage);
  }

  // ---------- M3: Mengira — times-table strategies ----------
  const M3_TIPS = {
    ms:['2 × 5 = 10 (sifir 2: gandaan 2)','4 × 5 = 20 (gandaan 5 berakhir 0 atau 5)','2 × 10 = 20 (gandaan 10 berakhir 0)','3 × 7 = 21 (sifir 3)'],
    en:['2 × 5 = 10 (2-times table: even numbers)','4 × 5 = 20 (5-times answers end in 0 or 5)','2 × 10 = 20 (10-times answers end in 0)','3 × 7 = 21 (3-times table)']
  };
  const M3_QUIZ = [
    {a:2, b:5, ans:10},
    {a:4, b:5, ans:20},
    {a:2, b:10, ans:20},
    {a:3, b:7, ans:21}
  ];
  function m3Round(){
    const itemIdx = Math.floor(Math.random()*M3_QUIZ.length);
    const item = M3_QUIZ[itemIdx];
    const tip = M3_TIPS[window.LANG === 'EN' ? 'en' : 'ms'][itemIdx];
    const wrongs = [item.ans-3, item.ans-4, item.ans+1, item.ans+5, item.ans+7, item.ans+10]
      .filter(v => v > 0 && v !== item.ans)
      .filter((v,i,a) => a.indexOf(v) === i).slice(0,3);
    const opts = shuffle([item.ans, ...wrongs]);

    const stage = el('div','stage');
    stage.appendChild(el('div','q', item.a + ' × ' + item.b));
    stage.appendChild(el('div','lead-sm', t('lab.m3.q') + ' ' + t('lab.m3.sub')));
    const fb = el('div','feedback');
    const optWrap = el('div','opts');
    opts.forEach(v => {
      const b = el('button','opt', String(v));
      b.type = 'button';
      b.addEventListener('click', function(){
        if(b.dataset.done) return;
        b.dataset.done = '1'; total++;
        if(Number(b.textContent) === item.ans){
          score++; b.classList.add('correct');
          fb.textContent = t('lab.m3.fb.good') + ' (' + tip + ')';
          fb.className = 'feedback good'; setMascot(t('lab.m3.fb.good').slice(0,42),'happy');
        } else {
          b.classList.add('wrong'); fb.textContent = t('lab.m3.fb.bad');
          fb.className = 'feedback bad'; setMascot(t('lab.m3.fb.bad').slice(0,42),'think');
          opts.forEach(o => { if(Number(o.textContent) === item.ans) o.classList.add('correct'); });
        }
        optWrap.querySelectorAll('button').forEach(x => x.disabled = true);
        setScore();
      });
      optWrap.appendChild(b);
    });
    stage.appendChild(optWrap); stage.appendChild(fb);
    q('.station[data-m="3"] .stage-area').innerHTML = '';
    q('.station[data-m="3"] .stage-area').appendChild(stage);
  }

  // ---------- M4a: Menguasai — problem solving ----------
  function m4Round(){
    const groups = [4,5,6][Math.floor(Math.random()*3)];
    const per = [5,7,8][Math.floor(Math.random()*3)];
    const ans = groups * per;
    const wrongs = [ans-3, ans-4, ans+1, ans+5, ans+7, ans+10]
      .filter(v => v > 0 && v !== ans)
      .filter((v,i,a) => a.indexOf(v) === i).slice(0,3);
    const opts = shuffle([ans, ...wrongs]);

    const stage = el('div','stage');
    const qText = window.LANG === 'EN'
      ? 'Solve this problem: ' + groups + ' groups, each with ' + per + ' items. What is the total?'
      : 'Selesaikan masalah ini: ' + groups + ' kumpulan, setiap kumpulan mempunyai ' + per + ' biji. Berapakah jumlah keseluruhan?';
    stage.appendChild(el('div','q', qText));
    stage.appendChild(el('div','lead-sm', t('lab.m4.sub')));
    const fb = el('div','feedback');
    const optWrap = el('div','opts');
    opts.forEach(v => {
      const b = el('button','opt', String(v));
      b.type = 'button';
      b.addEventListener('click', function(){
        if(b.dataset.done) return;
        b.dataset.done = '1'; total++;
        if(Number(b.textContent) === ans){
          score++; b.classList.add('correct'); fb.textContent = t('lab.m4.fb.good');
          fb.className = 'feedback good'; setMascot(t('lab.m4.fb.good').slice(0,42),'happy');
        } else {
          b.classList.add('wrong'); fb.textContent = t('lab.m4.fb.bad');
          fb.className = 'feedback bad'; setMascot(t('lab.m4.fb.bad').slice(0,42),'think');
          opts.forEach(o => { if(Number(o.textContent) === ans) o.classList.add('correct'); });
        }
        optWrap.querySelectorAll('button').forEach(x => x.disabled = true);
        setScore();
      });
      optWrap.appendChild(b);
    });
    stage.appendChild(optWrap); stage.appendChild(fb);
    q('.station[data-m="4"] .stage-area').innerHTML = '';
    q('.station[data-m="4"] .stage-area').appendChild(stage);
  }

  // ---------- M4b: mastery maze — 7-times table, single solution ----------
  // Construction guarantees uniqueness: the solution path (START->GOAL along
  // row 3) carries the values 7,14,...,56; every other cell carries a
  // multiple of 7 that is >= 70. Any valid chain from 7 to 56 must increase
  // by exactly 7 at each step, so it must stay on row 3 — the only cells
  // holding values in that range — giving exactly one solution.
  const GRID_W = 8, GRID_H = 7;
  const MAZE_START = [0,3], MAZE_GOAL = [GRID_W-1,3];
  function idx(x,y){ return x + y*GRID_W; }
  function buildMazeGrid(){
    const grid = new Array(GRID_W * GRID_H);
    // solution path: row 3, value = 7*(x+1) for x = 0..7
    for(let x = 0; x < GRID_W; x++) grid[idx(x,3)] = 7 * (x + 1);
    // fill remaining cells with unique multiples of 7 >= 70
    let big = 70;
    for(let i = 0; i < grid.length; i++){
      if(grid[i] !== undefined) continue;
      grid[i] = big; big += 7;
    }
    return grid;
  }

  function m4Maze(){
    const grid = buildMazeGrid();
    const root = q('.station[data-m="4"] .maze-area');
    root.innerHTML = '';
    const maze = el('div','maze');
    maze.setAttribute('role','grid');
    maze.setAttribute('aria-label','Labirin sifir 7 — satu penyelesaian / 7-times maze, single solution');
    const hint = el('div','sample-note', t('lab.maze.intro'));
    const fb = el('div','feedback');
    const cellEls = [];

    for(let y = 0; y < GRID_H; y++){
      for(let x = 0; x < GRID_W; x++){
        const b = el('button', '', String(grid[idx(x,y)]));
        b.type = 'button';
        b.dataset.x = x; b.dataset.y = y;
        if(x === MAZE_START[0] && y === MAZE_START[1]) b.className = 'start';
        if(x === MAZE_GOAL[0] && y === MAZE_GOAL[1]) b.className = 'goal';
        cellEls.push(b);
        maze.appendChild(b);
      }
    }
    root.appendChild(hint); root.appendChild(maze); root.appendChild(fb);

    function cellVal(x,y){ return grid[idx(x,y)]; }
    let current = null, solved = false, moves = 0;
    maze.addEventListener('click', function(ev){
      if(solved) return;
      const b = ev.target.closest('button');
      if(!b || b.classList.contains('start') || b.dataset.done) return;
      const x = Number(b.dataset.x), y = Number(b.dataset.y);
      const v = cellVal(x,y);
      if(!current){
        // first step: adjacent to START, value 14 (next in the 7-table after START's 7)
        if(!(Math.abs(x - MAZE_START[0]) + Math.abs(y - MAZE_START[1]) === 1) || v !== 14){
          b.classList.add('blocked'); b.dataset.done = '1';
          fb.textContent = t('lab.maze.wrong'); fb.className = 'feedback bad';
          setMascot(t('lab.maze.wrong').slice(0,40),'think'); moves++;
          return;
        }
        current = b; b.classList.add('current','onpath');
        moves++;
        return;
      }
      const cx = Number(current.dataset.x), cy = Number(current.dataset.y);
      const adjacent = Math.abs(x-cx) + Math.abs(y-cy) === 1;
      const cv = cellVal(cx,cy);
      if(adjacent && v === cv + 7){
        current.classList.remove('current');
        b.classList.add('current','onpath'); current = b; moves++;
        if(x === MAZE_GOAL[0] && y === MAZE_GOAL[1]){
          solved = true; b.classList.remove('current'); b.classList.add('goal','onpath');
          total++; score++;
          fb.textContent = t('lab.maze.solved') + ' (' + t('lab.maze.moved') + ': ' + moves + ')';
          fb.className = 'feedback good'; setMascot(t('lab.maze.solved').slice(0,40),'happy');
          setScore();
          cellEls.forEach(c => c.disabled = true);
        }
      } else {
        b.classList.add('blocked'); b.dataset.done = '1'; moves++;
        fb.textContent = t('lab.maze.wrong'); fb.className = 'feedback bad';
        setMascot(t('lab.maze.wrong').slice(0,40),'think');
      }
    });
  }

  // ---------- station wiring ----------
  const stations = ['1','2','3','4'];
  stations.forEach(m => {
    const tab = q('#tab-m' + m);
    const st = q('.station[data-m="' + m + '"]');
    if(!tab || !st) return;
    tab.addEventListener('click', function(){
      document.querySelectorAll('.station-tabs button').forEach(b => b.setAttribute('aria-selected','false'));
      tab.setAttribute('aria-selected','true');
      document.querySelectorAll('.station').forEach(s => s.classList.remove('active'));
      st.classList.add('active');
      if(m === '1') m1Round();
      if(m === '2') m2Round();
      if(m === '3') m3Round();
      if(m === '4'){ m4Round(); m4Maze(); }
    });
  });

  const restart = q('#lab-restart');
  if(restart) restart.addEventListener('click', function(){
    score = 0; total = 0;
    setScore();
    document.querySelectorAll('.station').forEach(s => {
      s.classList.remove('active');
    });
    document.querySelector('.station[data-m="1"]').classList.add('active');
    document.querySelectorAll('.station-tabs button').forEach(b => b.setAttribute('aria-selected','false'));
    q('#tab-m1').setAttribute('aria-selected','true');
    setMascot('TIGER BIJAK', 'wave');
    m1Round();
  });

  const motionBtn = q('#lab-motion');
  if(motionBtn){
    motionBtn.addEventListener('click', function(){
      motion = !motion;
      document.documentElement.classList.toggle('reduce-motion', !motion);
      motionBtn.textContent = motion ? t('lab.motion') : t('lab.motion.off');
      if(!motion && !q('.station[data-m="2"] .stage-area .array')) m2Round();
    });
  }

  // ---------- language-switch hook: re-render current station if unanswered ----------
  window.lab4mReset = function(){
    const active = document.querySelector('.station.active');
    if(!active) return;
    const answered = active.querySelector('.stage-area button[data-done]');
    if(answered) return; // keep in-progress quiz state
    const tab = document.getElementById('tab-' + active.dataset.m);
    if(tab) tab.click();
  };

  // init default state
  document.documentElement.classList.toggle('reduce-motion', !motion);
  if(motionBtn) motionBtn.textContent = t('lab.motion');
  setScore();
  setMascot('TIGER BIJAK', 'wave');
  m1Round();
})();

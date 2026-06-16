// THEME TOGGLE
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('iconSun');
function setTheme(dark){
  root.classList.toggle('dark', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  sunIcon.innerHTML = dark
    ? '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>'
    : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
setTheme(saved ? saved === 'dark' : prefersDark);
toggle.addEventListener('click', () => setTheme(!root.classList.contains('dark')));

// TERMINAL TYPING ANIMATION
const commands = [
  { cmd: '$ flutter run --release', out: '✓ Smartify.apk built — 24.1MB' },
  { cmd: '$ php artisan serve', out: '✓ Laravel server: http://127.0.0.1:8000' },
  { cmd: '$ python train_model.py', out: '✓ House price model — R² 0.91' },
  { cmd: '$ npm run dev', out: '✓ Node server running on :3000' },
  { cmd: '$ mysql -u root -p warehouse', out: '✓ Connected — 15,763 rows loaded' },
];
const termBody = document.getElementById('termBody');
let cmdIndex = 0;

function typeCommand(){
  termBody.innerHTML = '';
  const { cmd, out } = commands[cmdIndex];
  const line = document.createElement('div');
  line.className = 'term-line';
  termBody.appendChild(line);
  let i = 0;
  const typing = setInterval(() => {
    line.innerHTML = '<span class="term-prompt">' + cmd.slice(0, i+1).replace('$','$').replace(cmd.split(' ')[0],'') + '</span>';
    line.textContent = cmd.slice(0, i+1);
    line.innerHTML = cmd.slice(0,1) === '$' ? '<span class="term-prompt">$</span>' + cmd.slice(1, i+1) : cmd.slice(0,i+1);
    i++;
    if(i > cmd.length){
      clearInterval(typing);
      line.innerHTML += '<span class="term-cursor"></span>';
      setTimeout(() => {
        const outLine = document.createElement('span');
        outLine.className = 'term-out';
        outLine.textContent = out;
        termBody.appendChild(outLine);
        setTimeout(() => {
          cmdIndex = (cmdIndex + 1) % commands.length;
          typeCommand();
        }, 1800);
      }, 250);
    }
  }, 35);
}
typeCommand();

// SCROLL RAIL ACTIVE STATE
const railItems = document.querySelectorAll('.rail-item');
const sections = [...railItems].map(item => document.getElementById(item.dataset.target));
railItems.forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById(item.dataset.target).scrollIntoView({ behavior:'smooth' });
  });
});
function updateRail(){
  let activeIdx = 0;
  sections.forEach((sec, idx) => {
    if(sec && sec.getBoundingClientRect().top < window.innerHeight * 0.4) activeIdx = idx;
  });
  railItems.forEach((item, idx) => item.classList.toggle('active', idx === activeIdx));
}
window.addEventListener('scroll', updateRail);
updateRail();

// REVEAL ON SCROLL
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold:.12 });
revealEls.forEach(el => io.observe(el));

// SKILL BARS FILL ON VIEW
const bars = document.querySelectorAll('.lang-fill');
const barIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.style.width = e.target.dataset.pct + '%'; }
  });
}, { threshold:.4 });
bars.forEach(b => barIo.observe(b));

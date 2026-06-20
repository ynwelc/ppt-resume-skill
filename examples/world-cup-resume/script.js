// =========================================================================
// 1. CAROUSEL DECK TRANSITION LOGIC
// =========================================================================
let currentIdx = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const deck = document.getElementById('deck');
const navDotsContainer = document.getElementById('nav-dots');

function initNav() {
  navDotsContainer.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => jumpToSlide(i));
    navDotsContainer.appendChild(dot);
  }
  
  const modalGrid = document.getElementById('modal-index-grid');
  modalGrid.innerHTML = '';
  slides.forEach((slide, i) => {
    const title = slide.querySelector('.slide-title')?.textContent || `Slide ${i}`;
    const subtitle = slide.querySelector('.slide-subtitle')?.textContent || '';
    
    const card = document.createElement('div');
    card.className = 'index-card';
    card.innerHTML = `<h4>${title}</h4><p>${subtitle.substring(0, 40)}...</p>`;
    card.addEventListener('click', () => { 
      toggleIndexModal(); 
      jumpToSlide(i); 
    });
    modalGrid.appendChild(card);
  });
}

function jumpToSlide(idx) {
  if (idx < 0 || idx >= totalSlides) return;
  currentIdx = idx;
  deck.style.transform = `translateX(-${currentIdx * 100}vw)`;
  document.querySelectorAll('.nav-dot').forEach((dot, i) => dot.classList.toggle('active', i === currentIdx));
}

// Keyboard controls
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') toggleIndexModal();
  else if (e.key === 'ArrowRight' || e.key === ' ') jumpToSlide(currentIdx + 1);
  else if (e.key === 'ArrowLeft') jumpToSlide(currentIdx - 1);
});

// Touch controls
let touchStartX = 0;
window.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
window.addEventListener('touchend', (e) => {
  const diffX = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diffX) > 85) { 
    if (diffX < 0) jumpToSlide(currentIdx + 1); 
    else jumpToSlide(currentIdx - 1); 
  }
}, { passive: true });

// Mouse Wheel
let accumWheel = 0;
let wheelTimer = null;
window.addEventListener('wheel', (e) => {
  accumWheel += e.deltaY;
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => {
    if (Math.abs(accumWheel) > 60) { 
      if (accumWheel > 0) jumpToSlide(currentIdx + 1); 
      else jumpToSlide(currentIdx - 1); 
    }
    accumWheel = 0;
  }, 100);
}, { passive: true });

// =========================================================================
// 2. ESC INDEX MODAL OVERLAY
// =========================================================================
const modal = document.getElementById('index-modal');
function toggleIndexModal() {
  modal.classList.toggle('open');
  if (modal.classList.contains('open')) {
    document.querySelectorAll('.index-card').forEach((card, i) => card.classList.toggle('active', i === currentIdx));
  }
}
document.getElementById('nav-index-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleIndexModal(); });
document.querySelectorAll('.nav-tip').forEach(tip => { 
  tip.style.cursor = 'pointer'; 
  tip.addEventListener('click', (e) => { e.stopPropagation(); toggleIndexModal(); }); 
});

window.toggleTheme = function(e) { if (e) e.stopPropagation(); document.body.classList.toggle('light-theme'); }

// =========================================================================
// 3. WORLD CUP CONFETTI BACKGROUND
// =========================================================================
const canvas = document.getElementById('space-bg');
const ctx = canvas.getContext('2d');
let confettis = [];
const colors = ['#d4af37', '#8a1538', '#ffffff', '#00ffcc', '#e02222'];

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  confettis = [];
  for (let i = 0; i < 150; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      sizeX: Math.random() * 5 + 3,
      sizeY: Math.random() * 10 + 5,
      speedY: Math.random() * 2 + 1,
      speedX: Math.random() * 1 - 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2
    });
  }
}

function animateBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isLight = document.body.classList.contains('light-theme');
  
  confettis.forEach(c => {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rot * Math.PI / 180);
    ctx.fillStyle = c.color;
    ctx.globalAlpha = isLight ? 0.7 : 0.9;
    ctx.fillRect(-c.sizeX/2, -c.sizeY/2, c.sizeX, c.sizeY);
    ctx.restore();
    
    c.y += c.speedY;
    c.x += c.speedX;
    c.rot += c.rotSpeed;
    
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateBg);
}

window.addEventListener('resize', initCanvas);
window.addEventListener('DOMContentLoaded', () => { initNav(); initCanvas(); animateBg(); });

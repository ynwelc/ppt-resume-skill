// 1. CAROUSEL DECK TRANSITION LOGIC
let currentIdx = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const deck = document.getElementById('deck');
const navDotsContainer = document.getElementById('nav-dots');
const modalGrid = document.getElementById('modal-index-grid');

function initNav() {
  navDotsContainer.innerHTML = '';
  modalGrid.innerHTML = '';
  slides.forEach((slide, i) => {
    // Dots
    const dot = document.createElement('button');
    dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => jumpToSlide(i));
    navDotsContainer.appendChild(dot);
    
    // Index modal items
    const title = slide.querySelector('.slide-title')?.textContent || `Sector ${i}`;
    const subtitle = slide.querySelector('.slide-subtitle')?.textContent || 'Machinery Node';
    const card = document.createElement('div');
    card.className = 'index-card';
    card.setAttribute('data-idx', i);
    card.innerHTML = `<h4>${title}</h4><p>${subtitle.substring(0, 60)}...</p>`;
    card.addEventListener('click', () => { toggleIndexModal(); jumpToSlide(i); });
    modalGrid.appendChild(card);
  });
  
  jumpToSlide(0);
}

function jumpToSlide(idx) {
  if (idx < 0 || idx >= totalSlides) return;
  currentIdx = idx;
  deck.style.transform = `translateX(-${currentIdx * 100}vw)`;
  
  // Update dots and active slide class
  document.querySelectorAll('.nav-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIdx);
  });
  slides.forEach((slide, i) => {
    slide.classList.toggle('active-slide', i === currentIdx);
  });
}

// 2. THEME TOGGLE (Burner Mode)
window.toggleTheme = function(e) {
  e.stopPropagation();
  const isLight = document.body.classList.toggle('light-theme');
  const btn = document.getElementById('theme-toggle-btn');
  btn.style.color = isLight ? 'var(--glow-cyan)' : 'var(--glow-gold)';
  document.getElementById('hud-message').textContent = isLight ? "冷却凝结模式已启动（Blueprint View）。" : "高压燃煤模式已启动（Furnace View）。";
};

// 3. INDEX MODAL
function toggleIndexModal() {
  const modal = document.getElementById('index-modal');
  modal.classList.toggle('open');
}
document.getElementById('nav-index-btn').addEventListener('click', toggleIndexModal);

// Keyboard bindings
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') toggleIndexModal();
  else if (e.key === 'ArrowRight' || e.key === ' ') jumpToSlide(currentIdx + 1);
  else if (e.key === 'ArrowLeft') jumpToSlide(currentIdx - 1);
});

// Touch Swipe
let touchStartX = 0;
window.addEventListener('touchstart', (e) => touchStartX = e.touches[0].clientX, { passive: true });
window.addEventListener('touchend', (e) => {
  const diffX = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diffX) > 85) {
    if (diffX < 0) jumpToSlide(currentIdx + 1);
    else jumpToSlide(currentIdx - 1);
  }
}, { passive: true });

// 4. CUSTOM CURSOR
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');
window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .index-card, .glass-card, .theme-toggle-btn').forEach(el => {
  el.addEventListener('mouseenter', () => { 
    cursor.style.width = '36px'; cursor.style.height = '36px'; 
    cursor.style.backgroundColor = 'rgba(184, 115, 51, 0.2)'; 
  });
  el.addEventListener('mouseleave', () => { 
    cursor.style.width = '24px'; cursor.style.height = '24px'; 
    cursor.style.backgroundColor = 'transparent'; 
  });
});

// 5. STEAM & SPARKS CANVAS ENGINE
const canvas = document.getElementById('space-bg');
const ctx = canvas.getContext('2d');
let width, height;
const particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.type = Math.random() > 0.85 ? 'spark' : 'smoke';
    this.x = Math.random() * width;
    // Spawn mostly from the bottom
    this.y = height + Math.random() * 200;
    
    if (this.type === 'spark') {
      this.size = Math.random() * 3 + 1;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = -Math.random() * 5 - 2;
      this.life = Math.random() * 0.5 + 0.5;
      this.decay = Math.random() * 0.02 + 0.01;
    } else {
      // Smoke
      this.size = Math.random() * 40 + 20;
      this.vx = (Math.random() - 0.5) * 1;
      this.vy = -Math.random() * 1.5 - 0.5;
      this.life = Math.random() * 0.3 + 0.1;
      this.decay = Math.random() * 0.003 + 0.001;
    }
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    
    if (this.type === 'smoke') {
      this.size += 0.2; // Expand as it rises
      this.vx += (Math.random() - 0.5) * 0.1; // Drift
    } else {
      this.vy += 0.1; // Gravity affects sparks
    }
    
    if (this.life <= 0 || this.y < -50 || this.x < 0 || this.x > width) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    if (this.type === 'spark') {
      ctx.fillStyle = `rgba(255, 170, 0, ${this.life})`;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const isLight = document.body.classList.contains('light-theme');
      const r = isLight ? 150 : 80;
      const g = isLight ? 130 : 60;
      const b = isLight ? 100 : 50;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.life * 0.15})`;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// Initialize particles
for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  requestAnimationFrame(animate);
}

// Boot
initNav();
animate();

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
    const title = slide.querySelector('.slide-title')?.textContent || `Waypoint ${i}`;
    const subtitle = slide.querySelector('.slide-subtitle')?.textContent || 'Exploration Node';
    
    const card = document.createElement('div');
    card.className = 'index-card';
    card.setAttribute('data-idx', i);
    card.innerHTML = `
      <h4>${title}</h4>
      <p>${subtitle.substring(0, 60)}...</p>
    `;
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
  
  document.querySelectorAll('.nav-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIdx);
  });
}

// Keyboard Controls
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    toggleIndexModal();
  } else if (e.key === 'ArrowRight' || e.key === ' ') {
    jumpToSlide(currentIdx + 1);
  } else if (e.key === 'ArrowLeft') {
    jumpToSlide(currentIdx - 1);
  }
});

// Touch Swipe Bindings
let touchStartX = 0;
window.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  const diffX = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diffX) > 85) {
    if (diffX < 0) jumpToSlide(currentIdx + 1);
    else jumpToSlide(currentIdx - 1);
  }
}, { passive: true });

// Mouse Wheel Bindings
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
    document.querySelectorAll('.index-card').forEach((card, i) => {
      card.classList.toggle('active', i === currentIdx);
    });
  }
}

document.getElementById('nav-index-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  toggleIndexModal();
});

document.querySelectorAll('.nav-tip').forEach(tip => {
  tip.style.cursor = 'pointer';
  tip.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleIndexModal();
  });
});

// =========================================================================
// 3. THEME TOGGLE ENGINE
// =========================================================================
window.toggleTheme = function(e) {
  if (e) e.stopPropagation();
  document.body.classList.toggle('light-theme');
}

// =========================================================================
// 4. MAP COORDINATE GRID CANVAS
// =========================================================================
const canvas = document.getElementById('space-bg');
const ctx = canvas.getContext('2d');
let offset = 0;

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isLight = document.body.classList.contains('light-theme');
  const gridSize = 80; // Grid cell size
  
  // Theme dependent stroke color
  ctx.strokeStyle = isLight ? 'rgba(139, 69, 19, 0.08)' : 'rgba(184, 134, 11, 0.12)';
  ctx.lineWidth = 1;
  
  ctx.beginPath();
  // Vertical lines
  for (let x = (offset % gridSize) - gridSize; x < canvas.width; x += gridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }
  // Horizontal lines
  for (let y = (offset % gridSize) - gridSize; y < canvas.height; y += gridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }
  ctx.stroke();
  
  // Draw random coordinate markers (like latitude/longitude waypoints)
  ctx.fillStyle = isLight ? 'rgba(139, 69, 19, 0.25)' : 'rgba(184, 134, 11, 0.25)';
  ctx.font = '10px "IBM Plex Mono", monospace';
  
  // We use a fixed pseudo-randomness based on grid coordinates so they move with the map
  for (let x = (offset % gridSize) - gridSize; x < canvas.width; x += gridSize) {
    for (let y = (offset % gridSize) - gridSize; y < canvas.height; y += gridSize) {
       // Math logic to render marks sparsely but consistently relative to the pan
       let absoluteX = Math.round(x - offset);
       let absoluteY = Math.round(y - offset);
       if (Math.abs((absoluteX * 73 + absoluteY * 31) % 100) > 96) {
          ctx.fillText(`+${Math.abs(absoluteX)},${Math.abs(absoluteY)}`, x + 4, y - 4);
       }
    }
  }

  // Pan the map slowly
  offset += 0.3; 
  requestAnimationFrame(drawGrid);
}

// Handle window resize
window.addEventListener('resize', initCanvas);

// Initialize all systems
window.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCanvas();
  drawGrid();
});

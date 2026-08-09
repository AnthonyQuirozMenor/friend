/**
 * ==========================================================================
 * Flor Interactiva de 7 Pétalos
 * ==========================================================================
 * Puedes personalizar los 7 textos y fotos en la lista `petalsData` a continuación.
 * Coloca tus fotos en la carpeta 'foto/' (por ejemplo: foto/foto1.jpg, foto/foto2.jpg, etc.)
 */

const petalsData = [
  {
    id: 1,
    title: "1. Nuestra Gran Amistad",
    text: "Gracias por estar presente en cada momento, por tus risas y por ser esa persona en quien siempre puedo confiar.",
    image: "foto/foto1.jpg" // Puedes colocar tu foto aquí
  },
  {
    id: 2,
    title: "2. Momentos Inolvidables",
    text: "Cada anécdota, cada plática y cada locura compartida son tesoros que guardo con muchísimo cariño.",
    image: "foto/foto2.jpg"
  },
  {
    id: 3,
    title: "3. Tu Gran Corazón",
    text: "Admiro tu bondad, tu alegría contagiosa y la forma en que siempre iluminas el día de los que te rodean.",
    image: "foto/foto3.jpg"
  },
  {
    id: 4,
    title: "4. Apoyo Incondicional",
    text: "En los días buenos y en los no tan buenos, saber que cuento con tu apoyo hace todo mucho más fácil.",
    image: "foto/foto4.jpg"
  },
  {
    id: 5,
    title: "5. Risas que no se olvidan",
    text: "Por todas esas veces que no podíamos parar de reír hasta que nos dolía la panza. ¡Que vengan muchas más!",
    image: "foto/foto5.jpg"
  },
  {
    id: 6,
    title: "6. Por lo que Eres",
    text: "Nunca cambies tu esencia única. Eres una persona verdaderamente increíble y muy especial.",
    image: "foto/foto6.jpg"
  },
  {
    id: 7,
    title: "7. Por Nuestro Futuro",
    text: "Por todos los planes, viajes, metas y recuerdos que aún nos faltan por vivir juntos. ¡Siempre contarás conmigo!",
    image: "foto/foto7.jpg"
  }
];

// Estado de la aplicación
const state = {
  discovered: new Set(),
  currentPetalIndex: 0
};

// Elementos del DOM
const petalsGroup = document.getElementById('petals-group');
const flowerCenter = document.getElementById('flower-center');
const flowerStage = document.querySelector('.flower-stage');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// Modal Elements
const memoryModal = document.getElementById('memory-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalPetalBadge = document.getElementById('modal-petal-badge');
const modalImg = document.getElementById('modal-img');
const modalImgFallback = document.getElementById('modal-img-fallback');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrevBtn = document.getElementById('modal-prev-btn');
const modalNextBtn = document.getElementById('modal-next-btn');
const modalIndicators = document.getElementById('modal-indicators');

// Congrats Modal
const congratsModal = document.getElementById('congrats-modal');
const congratsBackdrop = document.getElementById('congrats-backdrop');
const congratsCloseBtn = document.getElementById('congrats-close-btn');

/**
 * Inicialización de la Flor
 */
function initFlower() {
  petalsGroup.innerHTML = '';
  const total = petalsData.length; // 7 pétalos

  petalsData.forEach((petal, index) => {
    const angle = (index * 360) / total; // Rotación exacta: 0°, 51.4°, 102.8°...
    
    const petalEl = document.createElement('div');
    petalEl.className = 'petal-item';
    petalEl.id = `petal-${petal.id}`;
    petalEl.style.setProperty('--rot', `${angle}deg`);
    petalEl.style.transform = `rotate(${angle}deg)`;
    petalEl.style.animationDelay = `${index * 0.1}s`;

    petalEl.innerHTML = `
      <div class="petal-shape">
        <span class="petal-number">${petal.id}</span>
        <span class="petal-status-icon">✨</span>
      </div>
    `;

    // Evento al tocar o hacer clic en el pétalo
    petalEl.addEventListener('click', (e) => {
      e.stopPropagation();
      openPetal(index);
    });

    petalsGroup.appendChild(petalEl);
  });

  // Generar indicadores en el modal
  renderIndicators();

  // Activar animación inicial
  setTimeout(() => {
    flowerStage.classList.add('blooming');
  }, 100);

  updateProgress();
}

/**
 * Renderizar puntos indicadores en el modal
 */
function renderIndicators() {
  modalIndicators.innerHTML = '';
  petalsData.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'indicator-dot';
    if (idx === state.currentPetalIndex) dot.classList.add('active');
    if (state.discovered.has(idx)) dot.classList.add('discovered');

    dot.addEventListener('click', () => {
      openPetal(idx);
    });
    modalIndicators.appendChild(dot);
  });
}

/**
 * Abrir un pétalo específico en el Modal
 */
function openPetal(index) {
  state.currentPetalIndex = index;
  const data = petalsData[index];

  // Marcar como descubierto
  const wasAlreadyDiscovered = state.discovered.has(index);
  state.discovered.add(index);

  // Actualizar clase del pétalo en la flor
  const petalEl = document.getElementById(`petal-${data.id}`);
  if (petalEl) {
    petalEl.classList.add('discovered');
  }

  // Actualizar contenido del modal
  modalPetalBadge.textContent = `Pétalo ${data.id} de ${petalsData.length}`;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.text;

  // Cargar imagen o fallback
  modalImg.style.display = 'block';
  modalImgFallback.style.display = 'none';
  modalImg.src = data.image;

  modalImg.onerror = () => {
    modalImg.style.display = 'none';
    modalImgFallback.style.display = 'flex';
  };

  modalImg.onload = () => {
    modalImg.style.display = 'block';
    modalImgFallback.style.display = 'none';
  };

  // Actualizar indicadores
  renderIndicators();
  updateProgress();

  // Mostrar modal
  memoryModal.classList.add('active');
  memoryModal.setAttribute('aria-hidden', 'false');

  // Si acaba de descubrir el último pétalo
  if (!wasAlreadyDiscovered && state.discovered.size === petalsData.length) {
    setTimeout(() => {
      triggerSparkleShower();
    }, 400);
  }
}

/**
 * Actualizar barra de progreso
 */
function updateProgress() {
  const count = state.discovered.size;
  const total = petalsData.length;
  const percentage = (count / total) * 100;

  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${count} de ${total} pétalos descubiertos`;

  if (count === total) {
    progressText.textContent = `¡Has descubierto los 7 pétalos! 💖`;
  }
}

/**
 * Cerrar Modal de Recuerdo
 */
function closeMemoryModal() {
  memoryModal.classList.remove('active');
  memoryModal.setAttribute('aria-hidden', 'true');

  // Si ya descubrió los 7 pétalos y cierra el modal, mostrar mensaje especial
  if (state.discovered.size === petalsData.length && !sessionStorage.getItem('congrats_shown')) {
    setTimeout(() => {
      openCongratsModal();
      sessionStorage.setItem('congrats_shown', 'true');
    }, 450);
  }
}

function openCongratsModal() {
  congratsModal.classList.add('active');
  congratsModal.setAttribute('aria-hidden', 'false');
  triggerSparkleShower();
}

function closeCongratsModal() {
  congratsModal.classList.remove('active');
  congratsModal.setAttribute('aria-hidden', 'true');
}

// Eventos de Navegación del Modal
modalPrevBtn.addEventListener('click', () => {
  const nextIdx = (state.currentPetalIndex - 1 + petalsData.length) % petalsData.length;
  openPetal(nextIdx);
});

modalNextBtn.addEventListener('click', () => {
  const nextIdx = (state.currentPetalIndex + 1) % petalsData.length;
  openPetal(nextIdx);
});

modalClose.addEventListener('click', closeMemoryModal);
modalBackdrop.addEventListener('click', closeMemoryModal);

congratsCloseBtn.addEventListener('click', closeCongratsModal);
congratsBackdrop.addEventListener('click', closeCongratsModal);

// Cierre con tecla Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMemoryModal();
    closeCongratsModal();
  }
});

// Clic en el centro de la flor
flowerCenter.addEventListener('click', () => {
  triggerSparkleShower();
  if (state.discovered.size === petalsData.length) {
    openCongratsModal();
  } else {
    // Abre el primer pétalo no descubierto o el actual
    const nextUndiscovered = petalsData.findIndex((_, idx) => !state.discovered.has(idx));
    if (nextUndiscovered !== -1) {
      openPetal(nextUndiscovered);
    } else {
      openPetal(0);
    }
  }
});

/**
 * ==========================================================================
 * Animación de Fondo: Partículas / Luces flotantes mágicas
 * ==========================================================================
 */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, isSparkle = false) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.size = isSparkle ? Math.random() * 4 + 2 : Math.random() * 2.5 + 1;
    this.speedX = isSparkle ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 0.6;
    this.speedY = isSparkle ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 0.6 - 0.2;
    this.alpha = isSparkle ? 1 : Math.random() * 0.6 + 0.2;
    this.decay = isSparkle ? Math.random() * 0.02 + 0.015 : 0;
    this.color = isSparkle 
      ? ['#FFD166', '#FF6080', '#FFA07A', '#FFFFFF', '#E040FB'][Math.floor(Math.random() * 5)]
      : '#FFB3C1';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.decay > 0) {
      this.alpha -= this.decay;
    } else {
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
    }
  }

  draw() {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Crear partículas continuas
for (let i = 0; i < 45; i++) {
  particles.push(new Particle());
}

function triggerSparkleShower() {
  const rect = flowerCenter.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 70; i++) {
    particles.push(new Particle(centerX, centerY, true));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();

    if (p.decay > 0 && p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();

// Iniciar aplicación
initFlower();

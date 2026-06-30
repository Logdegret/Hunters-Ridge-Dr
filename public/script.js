const modal = document.querySelector('.payment-modal');

function openPaymentOptions() {
  if (typeof modal.showModal === 'function') {
    if (!modal.open) modal.showModal();
  } else {
    modal.setAttribute('open', '');
  }
}

document.querySelectorAll('.pay-trigger').forEach(button => button.addEventListener('click', openPaymentOptions));
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

const carousel = document.querySelector('.carousel');
const slides = [...document.querySelectorAll('.carousel-slide')];
const dotsContainer = document.querySelector('.carousel-dots');
const carouselCount = document.querySelector('.carousel-count');
const carouselProgress = document.querySelector('.carousel-progress span');
let currentSlide = 0;
let carouselTimer;

const dots = slides.map((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = `carousel-dot${index === 0 ? ' active' : ''}`;
  dot.setAttribute('aria-label', `Show home ${index + 1} of ${slides.length}`);
  dot.addEventListener('click', () => showSlide(index, true));
  dotsContainer.appendChild(dot);
  return dot;
});

function showSlide(index, restart = false) {
  currentSlide = (index + slides.length) % slides.length;
  const previousSlide = (currentSlide - 1 + slides.length) % slides.length;
  const nextSlide = (currentSlide + 1) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === currentSlide;
    slide.classList.toggle('active', active);
    slide.classList.toggle('previous', slideIndex === previousSlide);
    slide.classList.toggle('next', slideIndex === nextSlide);
    slide.setAttribute('aria-hidden', String(!active && slideIndex !== previousSlide && slideIndex !== nextSlide));
  });
  dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentSlide));
  carouselCount.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  carouselProgress.classList.remove('running');
  void carouselProgress.offsetWidth;
  carouselProgress.classList.add('running');
  if (restart) startCarousel();
}

function startCarousel() {
  clearInterval(carouselTimer);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    carouselProgress.classList.remove('running');
    void carouselProgress.offsetWidth;
    carouselProgress.classList.add('running');
    carouselTimer = setInterval(() => showSlide(currentSlide + 1), 5500);
  }
}

document.querySelector('.carousel-prev').addEventListener('click', () => showSlide(currentSlide - 1, true));
document.querySelector('.carousel-next').addEventListener('click', () => showSlide(currentSlide + 1, true));
slides.forEach((slide, index) => slide.addEventListener('click', () => {
  if (index !== currentSlide) showSlide(index, true);
}));
carousel.addEventListener('mouseenter', () => clearInterval(carouselTimer));
carousel.addEventListener('mouseleave', startCarousel);
carousel.addEventListener('focusin', () => clearInterval(carouselTimer));
carousel.addEventListener('focusout', startCarousel);
carousel.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showSlide(currentSlide - 1, true);
  if (event.key === 'ArrowRight') showSlide(currentSlide + 1, true);
});
showSlide(0);
startCarousel();

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-header nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

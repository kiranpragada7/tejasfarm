// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hide'), 300);
  }
});

const navbar = document.getElementById('navbar');
const progress = document.getElementById('scroll-progress');
const backTop = document.getElementById('backTop');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Scroll progress + navbar blur + back-to-top
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) {
    progress.style.width = (scrolled / height * 100) + '%';
  }
  if (navbar) {
    navbar.classList.toggle('scrolled', scrolled > 60);
  }
  if (backTop) {
    backTop.classList.toggle('show', scrolled > 500);
  }
});

if (backTop) {
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Mobile menu
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }));
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => io.observe(el));

// Ripple effect
function ripple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const d = Math.max(btn.clientWidth, btn.clientHeight);
  circle.style.width = circle.style.height = d + 'px';
  const rect = btn.getBoundingClientRect();
  circle.style.left = (e.clientX - rect.left - d / 2) + 'px';
  circle.style.top = (e.clientY - rect.top - d / 2) + 'px';
  circle.classList.add('ripple');
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 650);
}

document.querySelectorAll('.btn, .fab').forEach((btn) => {
  btn.addEventListener('click', ripple);
});

// Lightbox
function openLightbox(e) {
  e.preventDefault();
  const src = e.currentTarget.getAttribute('href');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.add('open');
  }
  return false;
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
  }
}

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', openLightbox);
});

const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
      closeLightbox();
    }
  });
}
if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

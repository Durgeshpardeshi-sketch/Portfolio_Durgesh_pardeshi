/* ============================================================
   DURGESH PARDESHI PORTFOLIO — JavaScript
   Handles: Navbar, Hamburger, Scroll Reveals,
            Progress Bars, Contact Form, Active Nav
   ============================================================ */

'use strict';

// ─── DOM Ready ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initScrollReveal();
  initActiveNavHighlight();
  initTypingEffect();
});

// ─── Navbar Scroll Effect ─────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

// ─── Hamburger Menu ───────────────────────────────────────────
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!btn || !navLinks) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      navLinks.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !navLinks.contains(e.target)) {
      btn.classList.remove('open');
      navLinks.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ─── Scroll Reveal ────────────────────────────────────────────
function initScrollReveal() {
  // Add .reveal class to elements we want to animate in
  const revealTargets = [
    '.about-text', '.about-cards', '.about-card',
    '.skill-category', '.proficiency-section',
    '.project-card',
    '.timeline-item',
    '.contact-info'
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


// ─── Active Nav Highlight ─────────────────────────────────────
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));
}

// ─── Typing Effect in Hero ────────────────────────────────────
function initTypingEffect() {
  const taglineEl = document.querySelector('.hero-tagline');
  if (!taglineEl) return;

  const roles = [
    'CSE (AIML) Student',
    'Computer Vision Enthusiast',
    'Python Developer',
    'Problem Solver',
    'ML Practitioner'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let isPaused = false;

  // Only apply typing to the first "segment"
  // Replace the original text with a typed span
  const originalText = taglineEl.textContent;
  taglineEl.innerHTML = '<span id="typed-role"></span>';
  const typedEl = document.getElementById('typed-role');
  if (!typedEl) return;

  function type() {
    const current = roles[roleIdx];
    if (isPaused) {
      isPaused = false;
      setTimeout(type, 1200);
      return;
    }

    if (!isDeleting) {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isPaused = true;
        isDeleting = true;
      }
      setTimeout(type, 95);
    } else {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
      setTimeout(type, 55);
    }
  }

  // Start typing after hero animation delay
  setTimeout(type, 900);
}



// ─── Smooth Scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Skill Tag hover sparkle ──────────────────────────────────
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'scale(1.05)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = 'scale(1)';
  });
});

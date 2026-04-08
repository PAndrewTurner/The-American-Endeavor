document.addEventListener('DOMContentLoaded', () => {

  // ===== READING PROGRESS BAR =====
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }
    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateProgress);
    });
  }

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== INTERSECTION OBSERVER: FADE-IN =====
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  // ===== MOBILE HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.textContent = navLinks.classList.contains('open') ? '\u2715' : '\u2630';
    });

    // Mobile dropdown toggles
    navLinks.querySelectorAll(':scope > li').forEach(li => {
      const dropdown = li.querySelector('.dropdown-menu');
      if (dropdown) {
        li.querySelector(':scope > a').addEventListener('click', (e) => {
          if (window.innerWidth <= 900) {
            e.preventDefault();
            dropdown.classList.toggle('mobile-open');
          }
        });
      }
    });

    // Close menu when clicking a dropdown link on mobile
    navLinks.querySelectorAll('.dropdown-menu a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          navLinks.classList.remove('open');
          hamburger.textContent = '\u2630';
        }
      });
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = target.offsetTop - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // ===== 3D CARD TILT EFFECT =====
  document.querySelectorAll('.topic-card, .landing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== KEYBOARD: ESCAPE CLOSES MOBILE NAV =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks) {
      navLinks.classList.remove('open');
      if (hamburger) hamburger.textContent = '\u2630';
    }
  });

});

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const overlay = document.getElementById('overlay');
  const groupToggles = document.querySelectorAll('.nav-group-toggle');

  // Collapsible group toggles — click the chevron area to expand/collapse,
  // click the label text to navigate to the overview page
  groupToggles.forEach(toggle => {
    const chevron = toggle.querySelector('.chevron');
    const label = toggle.querySelector('span');

    // Clicking the chevron toggles expand/collapse
    chevron.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      const items = toggle.nextElementSibling;
      toggle.setAttribute('aria-expanded', !expanded);
      items.classList.toggle('open', !expanded);
    });

    // Clicking the label navigates to the overview and expands the group
    toggle.addEventListener('click', () => {
      const sectionId = toggle.getAttribute('data-section');
      if (sectionId) {
        const items = toggle.nextElementSibling;
        toggle.setAttribute('aria-expanded', 'true');
        items.classList.add('open');
        showSection(sectionId);
      }
    });
  });

  function expandGroupForLink(link) {
    const group = link.closest('.nav-group');
    if (group) {
      const toggle = group.querySelector('.nav-group-toggle');
      const items = group.querySelector('.nav-group-items');
      toggle.setAttribute('aria-expanded', 'true');
      items.classList.add('open');
    }
  }

  function showSection(sectionId) {
    sections.forEach(s => s.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add('active');
    }

    const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      // Auto-expand the parent group
      expandGroupForLink(activeLink);
      activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    // Scroll content to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Close mobile menu
    sidebar.classList.remove('open');
    overlay.classList.remove('active');

    // Update URL hash without scrolling
    history.replaceState(null, '', `#${sectionId}`);
  }

  // Nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  // Homepage card and overview card clicks
  document.querySelectorAll('.home-card, .overview-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = card.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });

  // Handle initial hash
  const hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) {
    showSection(hash);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
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
});

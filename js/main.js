/**
 * DAVID'S PORTFOLIO - JAVASCRIPT LOGIC
 * Features:
 *  - Theme switcher (Dark / Light) with localStorage & OS preference detection
 *  - Mobile navigation drawer toggle with ARIA accessibility
 *  - Scroll-spy active link highlighting via IntersectionObserver
 *  - Auto-updating copyright year
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollSpy();
  initCopyrightYear();
});

/* ===================================================================
   1. THEME SWITCHER (Dark / Light Mode)
=================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;
  const STORAGE_KEY = 'portfolio_theme';

  // Check saved theme or fallback to system preference
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let activeTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  rootElement.setAttribute('data-theme', activeTheme);

  // Toggle button event listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
    });
  }

  // Listen to OS theme changes if user has no stored preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const newTheme = e.matches ? 'dark' : 'light';
      rootElement.setAttribute('data-theme', newTheme);
    }
  });
}

/* ===================================================================
   2. MOBILE NAVIGATION DRAWER
=================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  // Toggle menu open / closed
  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* ===================================================================
   3. ACTIVE NAVIGATION LINK ON SCROLL (ScrollSpy)
=================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Trigger when section passes upper portion of viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ===================================================================
   4. DYNAMIC CURRENT YEAR
=================================================================== */
function initCopyrightYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

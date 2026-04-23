/* ===================================================
   BLACK SHAMROCK TATTOO — MAIN JS
   =================================================== */

(function () {
  'use strict';

  /* ---- Mobile nav ---- */
  var toggle  = document.querySelector('.nav-toggle');
  var overlay = document.querySelector('.nav-overlay');

  function openNav() {
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggle && overlay) {
    toggle.addEventListener('click', function () {
      overlay.classList.contains('open') ? closeNav() : openNav();
    });

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---- Active nav link ---- */
  var current = window.location.pathname.split('/').pop() || 'index.html';
  if (current === '') current = 'index.html';

  document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(function (link) {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });

  /* ---- Netlify contact form (AJAX) ---- */
  var contactForm = document.querySelector('form[name="contact"]');
  var thankYou    = document.querySelector('.thank-you-message');

  if (contactForm && thankYou) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(contactForm);
      fetch('/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    new URLSearchParams(data).toString(),
      })
        .then(function () {
          contactForm.style.display = 'none';
          thankYou.classList.add('visible');
          window.scrollTo({ top: thankYou.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
        })
        .catch(function () {
          contactForm.submit(); // fallback: full-page POST
        });
    });
  }

})();

(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const backToTop = document.getElementById('backToTop');
  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 450);
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  }

  // Close the mobile navigation after choosing a section.
  const navLinks = document.querySelectorAll('#navLinks .nav-link, #navLinks .btn-nav');
  const navMenu = document.getElementById('navLinks');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });

  // The form uses mailto as a no-backend demo. Replace with a real form endpoint for production.
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const data = new FormData(contactForm);
      const subject = encodeURIComponent('Portfolio enquiry: ' + (data.get('subject') || 'New project'));
      const body = encodeURIComponent(
        'Name: ' + data.get('name') + '\n' +
        'Email: ' + data.get('email') + '\n' +
        'Service: ' + data.get('subject') + '\n\n' +
        'Project details:\n' + data.get('message')
      );
      window.location.href = 'mailto:hello@example.com?subject=' + subject + '&body=' + body;
    });
  }
})();
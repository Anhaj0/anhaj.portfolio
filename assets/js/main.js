// main.js
window.addEventListener('DOMContentLoaded', () => {
  // Loader
  document.body.classList.add('loaded');
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenuContainer = document.getElementById('mobile-menu-container');

  if (menuToggle && mobileMenuContainer) {
    menuToggle.addEventListener('click', () => {
      mobileMenuContainer.classList.toggle('active');
      const isExpanded = mobileMenuContainer.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      menuToggle.textContent = isExpanded ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!mobileMenuContainer.contains(event.target) && 
          event.target !== menuToggle && 
          mobileMenuContainer.classList.contains('active')) {
        mobileMenuContainer.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      }
    });

    // Close menu when a link is clicked
    mobileMenuContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuContainer.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      });
    });
  }

  // Fade-in effect for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name.value}`);
      const body = encodeURIComponent(form.message.value + '\n\n— ' + form.name.value + ' (' + form.email.value + ')');
      window.location.href = `mailto:Anhaj0@icloud.com?subject=${subject}&body=${body}`;
    });
  }
});
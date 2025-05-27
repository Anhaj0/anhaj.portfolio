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

window.addEventListener('load', () => {
  const words = Array.from(document.querySelectorAll('.rotating-text__word'));
  let currentIndex = 0;
  const intervalTime = 3000;
  const letterDelay = 50;
  const letterAnimDuration = 400;

  // Wrap letters in spans for animation
  function splitLetters(wordEl) {
    const text = wordEl.textContent.trim();
    wordEl.textContent = '';
    for(let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.classList.add('rotating-text__letter');
      span.textContent = text[i];
      wordEl.appendChild(span);
    }
  }

  // Animate fade in left to right
  function animateLettersIn(wordEl) {
    const letters = wordEl.querySelectorAll('.rotating-text__letter');
    letters.forEach((letter, i) => {
      letter.style.animation = `letterFadeInLR ${letterAnimDuration}ms ease forwards`;
      letter.style.animationDelay = `${i * letterDelay}ms`;
    });
  }

  // Animate fade out left to right, return Promise when done
  function animateLettersOut(wordEl) {
    return new Promise(resolve => {
      const letters = wordEl.querySelectorAll('.rotating-text__letter');
      let finishedCount = 0;
      if (letters.length === 0) resolve();

      letters.forEach((letter, i) => {
        letter.style.animation = `letterFadeOutLR ${letterAnimDuration}ms ease forwards`;
        letter.style.animationDelay = `${i * letterDelay}ms`;
        letter.addEventListener('animationend', () => {
          finishedCount++;
          if(finishedCount === letters.length) resolve();
        }, {once: true});
      });
    });
  }

  // Prepare words
  words.forEach(splitLetters);

  // Initialize first word
  words.forEach(w => w.classList.remove('active'));
  words[0].classList.add('active');
  animateLettersIn(words[0]);

  async function rotate() {
    while(true) {
      const currentWord = words[currentIndex];
      const nextIndex = (currentIndex + 1) % words.length;
      const nextWord = words[nextIndex];

      await animateLettersOut(currentWord);
      currentWord.classList.remove('active');

      currentWord.querySelectorAll('.rotating-text__letter').forEach(letter => {
        letter.style.animation = 'none';
        letter.style.opacity = 0;
      });

      nextWord.classList.add('active');
      nextWord.querySelectorAll('.rotating-text__letter').forEach(letter => {
        letter.style.opacity = 0;
        letter.style.animation = 'none';
      });

      animateLettersIn(nextWord);

      currentIndex = nextIndex;

      await new Promise(r => setTimeout(r, intervalTime));
    }
  }

  rotate();

  window.addEventListener('load', () => {
  const tiltElements = document.querySelectorAll('.tilt-image');
  VanillaTilt.init(tiltElements, {
    max: 15,         // max tilt rotation (degrees)
    speed: 400,      // animation speed
    glare: true,     // enables glare effect
    "max-glare": 0.3 // max glare opacity
  });
});

// Add this block to stop video replay
  const video = document.querySelector('.hero-image video');
  if (video) {
    video.addEventListener('ended', () => {
      video.pause();
    });
  }

});

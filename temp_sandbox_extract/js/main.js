// ==========================================
//  ReplyVera — Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  // ---- Mobile hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  // ---- Typing effect in hero card ----
  const replyText = document.getElementById('typedReply');
  const message = "Thank you so much, Sarah! 🌟 We're absolutely thrilled to hear you had such a wonderful experience. Your kind words truly mean the world to our team. We can't wait to welcome you back again soon!";
  
  let charIndex = 0;
  let typingStarted = false;

  function typeReply() {
    if (charIndex < message.length) {
      replyText.textContent += message[charIndex];
      charIndex++;
      setTimeout(typeReply, 28);
    }
  }

  // Start typing after a short delay
  setTimeout(() => {
    typeReply();
  }, 1200);

  // ---- Intersection Observer for scroll animations ----
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grid items
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animate elements on scroll
  const animateEls = document.querySelectorAll(
    '.benefit-card, .step, .example-card, .testi-card, .price-card, .stat-item, .logo-chip'
  );

  animateEls.forEach((el, i) => {
    el.classList.add('fade-up');
    el.dataset.delay = (i % 4) * 80; // stagger by group
    observer.observe(el);
  });

  // Fade-up for section headings
  document.querySelectorAll('.section-title, .section-sub, .section-label, .hero-badge, .hero-headline, .hero-sub, .hero-cta, .hero-note').forEach((el, i) => {
    el.classList.add('fade-up');
    el.dataset.delay = i * 60;
    observer.observe(el);
  });

  // ---- Animated counter stats ----
  const statNums = document.querySelectorAll('.stat-num');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = formatNumber(Math.floor(current));
    }, stepTime);
  }

  function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K+';
    return num.toString();
  }

  // ---- Pricing toggle (monthly / annual) ----
  const billingToggle = document.getElementById('billingToggle');
  const monthlyPrices = document.querySelectorAll('.monthly-price');
  const annualPrices = document.querySelectorAll('.annual-price');

  billingToggle.addEventListener('change', () => {
    if (billingToggle.checked) {
      // Show annual
      monthlyPrices.forEach(el => el.style.display = 'none');
      annualPrices.forEach(el => el.style.display = 'inline');
    } else {
      // Show monthly
      monthlyPrices.forEach(el => el.style.display = 'inline');
      annualPrices.forEach(el => el.style.display = 'none');
    }
  });

  // ---- FAQ accordion ----
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ---- Add subtle parallax to hero blobs ----
  const blobs = document.querySelectorAll('.blob');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    blobs.forEach((blob, i) => {
      const factor = (i + 1) * 0.4;
      blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  // ---- Active nav highlight on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === `#${current}`) {
        a.style.color = 'var(--primary-light)';
      }
    });
  });

});

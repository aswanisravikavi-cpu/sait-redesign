/**
 * SAIT CUSAT — Cinematic Scroll & Smooth Inertia Controller
 * Powered by Lenis + GSAP ScrollTrigger
 * 
 * Features:
 * - Smooth weighted inertia scrolling via Lenis
 * - Combined scale-up (~0.95 -> 1.0) & deliberate fade-in (opacity 0 -> 1)
 * - Slow, luxurious easing (1.1s duration with power2.out)
 * - Staggered reveals for grouped elements (feature rows, timeline milestones, event cards, team items)
 * - Single-trigger execution (once: true) when entering 20-25% of the viewport
 */

export function initScrollAnimations() {
  // 1. Initialize Lenis Smooth Inertia Scrolling
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. Initialize GSAP & ScrollTrigger
  if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded, falling back to native intersection observer.');
    initFallbackObserver();
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Smooth scroll for internal anchor links using Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -60, duration: 1.4 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 3. Cinematic Section Reveal Animations (Scale ~0.95 -> 1.0 & Opacity 0 -> 1)
  const sections = [
    { selector: '.accreditation-bar', staggerChildren: '.acc-item' },
    { selector: '.about-section', staggerChildren: '.about-lead-col, .fact-item' },
    { selector: '.features-section', staggerChildren: '.feature-row' },
    { selector: '.achievements-section', staggerChildren: '.timeline-row' },
    { selector: '.events-section', staggerChildren: '.flagship-highlight-strip, .event-schedule-row' },
    { selector: '.people-section', staggerChildren: '.community-profile-item' },
    { selector: '.logger-section', staggerChildren: '.logger-kpi-card, .logger-tab-content' },
    { selector: '.notices-section', staggerChildren: '.notice-row' },
    { selector: '.contact-section', staggerChildren: '.contact-channel-card, .contact-form-card' },
    { selector: '.site-footer', staggerChildren: null }
  ];

  sections.forEach(({ selector, staggerChildren }) => {
    const sectionEl = document.querySelector(selector);
    if (!sectionEl) return;

    // Header reveal within the section
    const headerEl = sectionEl.querySelector('.section-header, .about-header-grid');
    if (headerEl) {
      gsap.fromTo(
        headerEl,
        {
          opacity: 0,
          scale: 0.95,
          y: 28,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerEl,
            start: 'top 80%', // ~20-25% into viewport
            once: true,
          },
        }
      );
    }

    // Staggered children reveal
    if (staggerChildren) {
      const items = sectionEl.querySelectorAll(staggerChildren);
      if (items.length > 0) {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            scale: 0.95,
            y: 24,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12, // 0.12s cascade
            ease: 'power2.out',
            scrollTrigger: {
              trigger: items[0],
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    } else if (!headerEl) {
      // Direct section container animation
      gsap.fromTo(
        sectionEl,
        {
          opacity: 0,
          scale: 0.96,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }
  });

  // Numeric counter animation on ScrollTrigger
  const statNumbers = document.querySelectorAll('.stat-big-num[data-target]');
  statNumbers.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const target = el.dataset.target;
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        animateNumber(el, target, prefix, suffix);
      },
    });
  });
}

function animateNumber(element, targetStr, prefix = '', suffix = '') {
  const targetVal = parseFloat(targetStr);
  const isFloat = targetStr.includes('.');
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const easeOutQuad = 1 - (1 - progress) * (1 - progress);
    const current = progress * targetVal;

    element.textContent = `${prefix}${isFloat ? current.toFixed(1) : Math.floor(current)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = `${prefix}${targetStr}${suffix}`;
    }
  }

  requestAnimationFrame(step);
}

function initFallbackObserver() {
  const statNumbers = document.querySelectorAll('.stat-big-num[data-target]');
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = el.dataset.target;
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          animateNumber(el, target, prefix, suffix);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    statNumbers.forEach(n => observer.observe(n));
  }
}

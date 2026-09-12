/**
 * SAIT CUSAT — Application Bootstrap & Orchestrator
 * Atmospheric Editorial Tech System
 */

import { initHeroCanvas } from './components/heroCanvas.js';
import { initThemeToggle } from './components/themeToggle.js';
import { initNavbar } from './components/navbar.js';
import { initCountdown } from './components/countdown.js';
import { initFlagshipSection } from './components/flagshipModal.js';
import { initTeamSection } from './components/teamFilter.js';
import { initActivityLogger } from './components/activityLogger.js';
import { initNotifications } from './components/notifications.js';
import { initContactSection } from './components/contactModal.js';
import { initScrollAnimations } from './components/scrollAnimations.js';

import { achievementsData } from './data/achievementsData.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Atmospheric Interactive Canvas Backdrop (Hero Only)
  initHeroCanvas();

  // 2. Initialize Theme Toggle (Warm Ivory Light / Deep Navy Dark)
  initThemeToggle();

  // 3. Initialize Navigation & Controls
  initNavbar();
  initCountdown();
  initFlagshipSection();
  initTeamSection();
  initActivityLogger();
  initNotifications();
  initContactSection();

  // 4. Render Achievements Timeline
  renderAchievements();

  // 5. GSAP + ScrollTrigger Cinematic Reveals & Lenis Inertia Scrolling
  initScrollAnimations();
});

function renderAchievements() {
  const container = document.getElementById('achievementsGrid');
  if (!container) return;

  container.innerHTML = achievementsData.map(ach => `
    <div class="timeline-row">
      <div class="timeline-year">${ach.year && ach.year !== 'Accredited' ? ach.year : ach.rank}</div>
      <div class="timeline-title-col">
        <h3 class="timeline-title">${ach.title}</h3>
        <div class="timeline-category">${ach.category}</div>
      </div>
      <p class="timeline-desc">${ach.desc}</p>
      <div class="timeline-verified">✓ ${ach.verified}</div>
    </div>
  `).join('');
}

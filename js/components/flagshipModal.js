/**
 * SAIT CUSAT — Flagship Hackathon Registration & Problem Explorer
 * Minimal Editorial Layout
 */

import { problemStatements, pastEvents, flagshipEvent } from '../data/eventsData.js';
import { showToast } from './contactModal.js';

export function initFlagshipSection() {
  renderProblemStatements();
  setupRegistrationModal();
}

function renderProblemStatements() {
  const container = document.getElementById('problemsContainer');
  if (!container) return;

  container.innerHTML = problemStatements.map(p => `
    <div class="capability-item" data-category="${p.category}" style="margin-bottom: 1.5rem;">
      <div class="capability-num">#${String(p.id).padStart(2, '0')} • ${p.category}</div>
      <h4 class="capability-title" style="font-size: 0.95rem; text-transform: none; letter-spacing: 0.01em; margin-bottom: 0.4rem;">${p.title}</h4>
      <p class="capability-desc" style="font-size: 0.85rem;">${p.desc}</p>
      <div style="margin-top: 0.6rem;">
        <span class="badge badge-gold" style="font-size: 0.68rem;">${p.tag}</span>
      </div>
    </div>
  `).join('');
}

function setupRegistrationModal() {
  const openBtn = document.getElementById('openRegisterModalBtn');
  const modal = document.getElementById('hackathonModal');
  const closeBtn = document.getElementById('closeHackathonModal');
  const form = document.getElementById('hackathonRegisterForm');
  const ticketPreview = document.getElementById('ticketPreviewArea');

  if (!openBtn || !modal) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const teamName = document.getElementById('regTeamName').value.trim();
      const leadName = document.getElementById('regLeadName').value.trim();
      const leadEmail = document.getElementById('regEmail').value.trim();
      const statement = document.getElementById('regProblemStatement').value;
      const femaleCheck = document.getElementById('regFemaleCheck').checked;

      if (!femaleCheck) {
        showToast("Eligibility Requirement", "Flagship hackathon rules require at least one female team member.", "warning");
        return;
      }

      const teamId = "SCI-2025-" + Math.floor(1000 + Math.random() * 9000);

      // Render Virtual Pass in Luxury Editorial Tech style
      ticketPreview.innerHTML = `
        <div style="background: var(--bg-surface); border: 1px solid var(--accent-gold); padding: 2rem; position: relative; margin-top: 1.5rem; box-shadow: var(--shadow-md);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
            <div>
              <span class="badge badge-gold" style="margin-bottom: 0.5rem;">VERIFIED ENTRY PASS</span>
              <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 500; color: var(--text-primary);">${teamName}</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.2rem;">Lead: ${leadName} (${leadEmail})</p>
            </div>
            <div style="text-align: right;">
              <span style="font-family: var(--font-mono); font-weight: 600; color: var(--accent-gold); font-size: 1rem;">${teamId}</span>
              <p style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); margin-top: 0.2rem;">CIITIC • SOE CUSAT</p>
            </div>
          </div>
          <div style="border-top: 1px dashed var(--border-medium); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.84rem; color: var(--text-muted);">
            <span>Track: ${statement || 'Open Track'}</span>
            <span style="color: var(--accent-gold); font-weight: 600;">✓ Diversity Requirement Met</span>
          </div>
        </div>
      `;

      form.style.display = 'none';
      ticketPreview.style.display = 'block';

      showToast("Registration Confirmed", `Pass ${teamId} generated for ${teamName}. Check your email.`, "success");
    });
  }
}

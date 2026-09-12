/**
 * SAIT CUSAT — People & Community Directory Controller
 * Supports Profile Photos for Faculty, Executive Core, Wings, and Alumni
 */

import { allTeamMembers, executiveCore } from '../data/teamData.js';
import { facultyMembers } from '../data/facultyData.js';
import { alumniProfiles } from '../data/alumniData.js';

export function initTeamSection() {
  const container = document.getElementById('teamGrid');
  const tabs = document.querySelectorAll('.team-tab-btn');

  if (!container) return;

  function renderProfiles(category = 'all') {
    let html = '';

    if (category === 'faculty') {
      html = facultyMembers.map(f => renderFacultyCard(f)).join('');
    } else if (category === 'alumni') {
      html = alumniProfiles.map(a => renderAlumniCard(a)).join('');
    } else if (category === 'core') {
      html = executiveCore.map(m => renderMemberCard(m)).join('');
    } else if (category === 'all') {
      // Show Faculty, Core, and Wing representatives
      const facultyHtml = facultyMembers.map(f => renderFacultyCard(f)).join('');
      const membersHtml = allTeamMembers.map(m => renderMemberCard(m)).join('');
      html = facultyHtml + membersHtml;
    } else {
      const filtered = allTeamMembers.filter(m => m.subteam === category);
      html = filtered.map(m => renderMemberCard(m)).join('');
    }

    container.innerHTML = html;
  }

  function renderMemberCard(m) {
    const photoContent = m.photo
      ? `<img src="${m.photo}" alt="${m.name}" class="profile-portrait-img">`
      : `<div class="profile-portrait-placeholder"><span>${m.initials}</span></div>`;

    return `
      <div class="community-profile-item" data-subteam="${m.subteam}">
        <div class="profile-portrait-frame">
          ${photoContent}
          <div class="portrait-corner-accent"></div>
        </div>
        <div class="profile-info-block">
          <h3 class="profile-name">${m.name}</h3>
          <div class="profile-role">${m.role} • ${formatSubteam(m.subteam)}</div>
          <div class="profile-meta">${m.year} • SOE CUSAT</div>
          <p class="profile-bio">${m.bio}</p>
          <div class="profile-links">
            <a href="${m.linkedin}" target="_blank" rel="noopener" class="profile-link-btn" aria-label="${m.name} LinkedIn">
              <span>LinkedIn</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
            <a href="${m.github}" target="_blank" rel="noopener" class="profile-link-btn" aria-label="${m.name} GitHub">
              <span>GitHub</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  function renderFacultyCard(f) {
    const photoContent = f.photo
      ? `<img src="${f.photo}" alt="${f.name}" class="profile-portrait-img">`
      : `<div class="profile-portrait-placeholder faculty-placeholder"><span>${f.initials}</span></div>`;

    return `
      <div class="community-profile-item faculty-item">
        <div class="profile-portrait-frame">
          ${photoContent}
          <div class="portrait-corner-accent"></div>
        </div>
        <div class="profile-info-block">
          <h3 class="profile-name">${f.name}</h3>
          <div class="profile-role">${f.role}</div>
          <div class="profile-meta">${f.degree} • ${f.department}</div>
          <p class="profile-bio">${f.bio}</p>
          <div style="margin-top: 0.6rem;">
            <span class="badge badge-gold" style="font-size: 0.68rem;">${f.specialization}</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderAlumniCard(a) {
    const photoContent = a.photo
      ? `<img src="${a.photo}" alt="${a.name}" class="profile-portrait-img">`
      : `<div class="profile-portrait-placeholder alumni-placeholder"><span>${a.initials}</span></div>`;

    return `
      <div class="community-profile-item alumni-item">
        <div class="profile-portrait-frame">
          ${photoContent}
          <div class="portrait-corner-accent"></div>
        </div>
        <div class="profile-info-block">
          <h3 class="profile-name">${a.name}</h3>
          <div class="profile-role">${a.role} • <strong style="color: var(--accent-gold);">${a.company}</strong></div>
          <div class="profile-meta">${a.batch} • 📍 ${a.location}</div>
          <p class="profile-bio">"${a.blurb}"</p>
        </div>
      </div>
    `;
  }

  function formatSubteam(sub) {
    switch (sub) {
      case 'core': return 'Executive Core';
      case 'technical': return 'Technical Wing';
      case 'media': return 'Media & Arts';
      case 'events': return 'Events & Sports';
      case 'outreach': return 'Outreach & Alumni';
      case 'placement': return 'Placement Wing';
      default: return 'Executive Team';
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProfiles(tab.dataset.filter);
    });
  });

  renderProfiles('all');
}

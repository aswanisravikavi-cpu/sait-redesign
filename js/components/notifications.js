/**
 * SAIT CUSAT — Notifications & Circulars Component
 * Editorial Notice Board
 */

import { announcementsData } from '../data/announcementsData.js';

export function initNotifications() {
  const container = document.getElementById('notificationsFeed');
  const tabs = document.querySelectorAll('.notif-filter-btn');
  const modal = document.getElementById('announcementModal');
  const modalTitle = document.getElementById('announcementModalTitle');
  const modalMeta = document.getElementById('announcementModalMeta');
  const modalBody = document.getElementById('announcementModalBody');
  const closeModal = document.getElementById('closeAnnouncementModal');

  if (!container) return;

  function renderList(filter = 'all') {
    const list = filter === 'all' 
      ? announcementsData 
      : announcementsData.filter(a => a.category.toLowerCase() === filter.toLowerCase());

    container.innerHTML = list.map(item => `
      <div class="notice-row" data-id="${item.id}">
        <div class="notice-date">${item.date}</div>
        <div>
          <div class="notice-title">${item.title}</div>
          <div class="notice-dept">${item.summary}</div>
        </div>
        <div style="text-align: right;">
          <span class="badge badge-gold">${item.category}</span>
        </div>
      </div>
    `).join('');

    // Attach click listeners
    container.querySelectorAll('.notice-row').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const announcement = announcementsData.find(a => a.id === id);
        if (announcement && modal) {
          modalTitle.textContent = announcement.title;
          modalMeta.innerHTML = `
            <span class="badge badge-gold">${announcement.category}</span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-left: 8px;">${announcement.date} • ${announcement.time}</span>
          `;
          modalBody.innerHTML = `
            <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem; color: var(--text-primary);">${announcement.summary}</p>
            <div style="background: var(--bg-surface); padding: 1.25rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); margin-bottom: 1.5rem; font-size: 0.9rem;">
              <div><strong>Target Cohort:</strong> ${announcement.details.targetYear}</div>
              <div><strong>Issued By:</strong> ${announcement.details.author}</div>
              <div><strong>Official Action:</strong> ${announcement.details.actionRequired}</div>
            </div>
            ${announcement.details.linkText ? `
              <a href="${announcement.details.linkUrl}" class="btn btn-primary" style="width: 100%;" target="_blank" rel="noopener">
                <span>${announcement.details.linkText}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            ` : ''}
          `;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  const closeDialog = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (closeModal) closeModal.addEventListener('click', closeDialog);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeDialog();
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderList(tab.dataset.filter);
    });
  });

  renderList('all');
}

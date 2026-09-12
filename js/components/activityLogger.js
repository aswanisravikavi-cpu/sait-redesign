/**
 * SAIT CUSAT — Student Activity Logger Interactive Component
 */

import { activityTypes, initialStudentFeed, departmentLeaderboard } from '../data/loggerData.js';
import { showToast } from './contactModal.js';

export function initActivityLogger() {
  let feedState = [...initialStudentFeed];
  let leaderboardState = [...departmentLeaderboard];

  const viewTabs = document.querySelectorAll('.logger-tab-btn');
  const panels = document.querySelectorAll('.logger-view-panel');
  const categorySelect = document.getElementById('activityCategorySelect');
  const pointsPreview = document.getElementById('calculatedPointsDisplay');
  const submitForm = document.getElementById('activitySubmitForm');
  const feedList = document.getElementById('activityFeedList');
  const leaderboardContainer = document.getElementById('leaderboardList');

  // Setup tab switcher
  viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      viewTabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(tab.dataset.target);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Populate Categories in Select
  if (categorySelect) {
    categorySelect.innerHTML = activityTypes.map(t => `
      <option value="${t.id}" data-points="${t.points}">${t.label} (+${t.points} pts)</option>
    `).join('');

    categorySelect.addEventListener('change', () => {
      const selected = categorySelect.options[categorySelect.selectedIndex];
      const pts = selected.getAttribute('data-points');
      if (pointsPreview) pointsPreview.textContent = `+${pts}`;
    });
  }

  // Render Feed
  function renderFeed(items) {
    if (!feedList) return;
    feedList.innerHTML = items.map(item => `
      <div class="feed-item">
        <div>
          <div class="feed-student">${item.studentName} <span class="badge badge-primary" style="margin-left: 6px;">${item.year}</span></div>
          <div class="feed-event"><strong>${item.eventName}</strong> • ${item.category}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono); margin-top: 4px;">
            Role: ${item.role} | Date: ${item.date}
          </div>
        </div>
        <div style="text-align: right; display: flex; align-items: center; gap: 12px;">
          <span style="font-family: var(--font-mono); font-weight: 800; color: var(--emerald-light); font-size: 1.15rem;">+${item.points} pts</span>
          <span class="badge ${item.status === 'Verified' ? 'badge-emerald' : 'badge-amber'}">${item.status}</span>
        </div>
      </div>
    `).join('');
  }

  // Render Leaderboard
  function renderLeaderboard(board) {
    if (!leaderboardContainer) return;
    leaderboardContainer.innerHTML = board.map(b => `
      <div class="leaderboard-item">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span class="leaderboard-rank rank-${b.rank}">#${b.rank}</span>
          <div class="member-avatar" style="width: 42px; height: 42px; font-size: 1rem;">${b.avatar}</div>
          <div>
            <div style="font-weight: 700; color: var(--text-primary); font-size: 0.98rem;">${b.studentName}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">${b.year} • ${b.activitiesCount} Verified Activities</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="badge badge-${b.badgeColor}">${b.badge}</span>
          <span style="font-family: var(--font-mono); font-weight: 800; font-size: 1.2rem; color: var(--primary-light);">${b.totalPoints} pts</span>
        </div>
      </div>
    `).join('');
  }

  // Form submission
  if (submitForm) {
    submitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const studentName = document.getElementById('logStudentName').value.trim();
      const year = document.getElementById('logStudentYear').value;
      const eventName = document.getElementById('logEventName').value.trim();
      const role = document.getElementById('logRole').value.trim();
      const date = document.getElementById('logDate').value || new Date().toISOString().split('T')[0];
      const proofUrl = document.getElementById('logProofUrl').value.trim();
      const selectedOption = categorySelect.options[categorySelect.selectedIndex];
      const points = parseInt(selectedOption.getAttribute('data-points'), 10);
      const categoryLabel = selectedOption.text.split(' (+')[0];

      if (!studentName || !eventName || !role) {
        showToast("Incomplete Form", "Please fill in all activity details.", "warning");
        return;
      }

      const newActivity = {
        id: "act-" + Date.now(),
        studentName,
        year,
        eventName,
        category: categoryLabel,
        role,
        points,
        date,
        status: "Under Review",
        proofLink: proofUrl || "https://drive.google.com/mock-proof"
      };

      feedState.unshift(newActivity);
      renderFeed(feedState);

      // Check if student exists on leaderboard to increment
      const studentInBoard = leaderboardState.find(s => s.studentName.toLowerCase() === studentName.toLowerCase());
      if (studentInBoard) {
        studentInBoard.totalPoints += points;
        studentInBoard.activitiesCount += 1;
      } else {
        leaderboardState.push({
          rank: leaderboardState.length + 1,
          studentName,
          year,
          avatar: studentName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
          activitiesCount: 1,
          totalPoints: points,
          badge: "New Contributor",
          badgeColor: "cyan"
        });
      }

      leaderboardState.sort((a, b) => b.totalPoints - a.totalPoints);
      leaderboardState.forEach((item, idx) => item.rank = idx + 1);
      renderLeaderboard(leaderboardState);

      submitForm.reset();
      if (pointsPreview) pointsPreview.textContent = '+50';

      showToast("Activity Submitted!", `${points} activity points logged for ${studentName}. Pending faculty credit verification.`, "success");

      // Switch to feed view
      const feedTab = document.querySelector('[data-target="loggerFeedView"]');
      if (feedTab) feedTab.click();
    });
  }

  // Initial renders
  renderFeed(feedState);
  renderLeaderboard(leaderboardState);
}

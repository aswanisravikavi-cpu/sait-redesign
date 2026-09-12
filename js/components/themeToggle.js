/**
 * SAIT CUSAT — Theme Controller (Warm Nude Light Mode & Deep Navy Dark Mode)
 * Saves user preference and coordinates smooth transition across UI and Canvas.
 */

export function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  let currentTheme = localStorage.getItem('sait-theme') || 'nude';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateToggleUI(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isCurrentlyDark ? 'nude' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('sait-theme', nextTheme);
    updateToggleUI(nextTheme);
  });
}

function updateToggleUI(theme) {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  if (theme === 'dark') {
    // In dark mode: Show sun/matrix icon to switch to Warm Ivory Light
    toggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    toggleBtn.setAttribute('title', 'Switch to Warm Ivory Light Mode');
    toggleBtn.setAttribute('aria-label', 'Switch to Warm Ivory Light Mode');
  } else {
    // In light mode: Show 3x3 dot matrix / moon icon matching reference
    toggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    toggleBtn.setAttribute('title', 'Switch to Deep Navy Dark Mode');
    toggleBtn.setAttribute('aria-label', 'Switch to Deep Navy Dark Mode');
  }
}

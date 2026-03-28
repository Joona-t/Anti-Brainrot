/**
 * Anti Brainrot v1.0.3 — Popup Script
 * Settings UI with grouped collapsible sections
 */

// Theme dropdown
const THEMES = ['retro', 'dark', 'beige', 'slate'];
const THEME_NAMES = { retro: 'Retro Pink', dark: 'Dark', beige: 'Beige', slate: 'Slate' };
function applyTheme(t) {
  THEMES.forEach(n => document.body.classList.remove('theme-' + n));
  document.body.classList.add('theme-' + t);
  const label = document.getElementById('themeLabel');
  if (label) label.textContent = THEME_NAMES[t] || t;
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.theme === t);
  });
}
(function initThemeDropdown() {
  const toggle = document.getElementById('themeToggle');
  const menu = document.getElementById('themeMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('open'); });
    menu.addEventListener('click', (e) => {
      const opt = e.target.closest('.theme-option');
      if (!opt) return;
      const theme = opt.dataset.theme;
      applyTheme(theme);
      browser.storage.local.set({ theme });
      menu.classList.remove('open');
    });
    document.addEventListener('click', () => menu.classList.remove('open'));
  }
  browser.storage.local.get(['theme', 'darkMode']).then(({ theme, darkMode }) => {
    if (!theme && darkMode) theme = 'dark';
    applyTheme(theme || 'retro');
  });
}).catch(() => {});
})();

const FEATURE_IDS = [
  'hideHomepage', 'hideSidebar', 'hideEndscreen', 'hideShorts', 'hideMix',
  'hideComments', 'hideDescription', 'hideLiveChat', 'hideMerch',
  'hideVideoButtons', 'hideChannelInfo', 'hideNotifications', 'hideAnnotations', 'hidePlaylist',
  'disableAutoplay'
];

const ALL_IDS = ['masterToggle', ...FEATURE_IDS];

const DEFAULTS = {
  masterToggle: true,
  hideHomepage: true,
  hideSidebar: true,
  hideEndscreen: true,
  hideShorts: true,
  hideMix: true,
  hideComments: true,
  hideDescription: false,
  hideLiveChat: true,
  hideMerch: true,
  hideVideoButtons: false,
  hideChannelInfo: false,
  hideNotifications: false,
  hideAnnotations: true,
  hidePlaylist: false,
  disableAutoplay: true
};

function loadSettings() {
  browser.storage.local.get(DEFAULTS).then(settings => {
    ALL_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.checked = !!settings[id];
    });
    updateMasterState();
  }).catch(err => console.error('Error loading settings:', err));
}

function saveSettings() {
  const settings = {};
  ALL_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) settings[id] = el.checked;
  });

  browser.storage.local.set(settings).then(() => {
    showStatus();
  }).catch(err => console.error('Error saving settings:', err));
}

function updateMasterState() {
  const isEnabled = document.getElementById('masterToggle').checked;
  const groups = document.getElementById('featureGroups');

  FEATURE_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = !isEnabled;
  });

  document.querySelectorAll('.setting').forEach(s => {
    s.classList.toggle('disabled', !isEnabled);
  });

  groups.style.opacity = isEnabled ? '1' : '0.5';
}

function toggleGroup(btn) {
  const groupId = btn.getAttribute('data-group');
  const body = document.getElementById('group-' + groupId);
  const chevron = btn.querySelector('.group-chevron');
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';

  body.classList.toggle('collapsed', isExpanded);
  btn.setAttribute('aria-expanded', !isExpanded);
  chevron.textContent = isExpanded ? '▸' : '▾';
}

function showStatus() {
  const status = document.getElementById('status');
  status.classList.add('show');
  setTimeout(() => status.classList.remove('show'), 2000);
}

function init() {
  loadSettings();

  // Master toggle
  document.getElementById('masterToggle').addEventListener('change', () => {
    updateMasterState();
    saveSettings();
  });

  // Feature toggles
  FEATURE_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', saveSettings);
  });

  // Collapsible group headers
  document.querySelectorAll('.group-header').forEach(btn => {
    btn.addEventListener('click', () => toggleGroup(btn));
  });

  // Settings button
  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      browser.runtime.openOptionsPage();
    });
  }
}

document.addEventListener('DOMContentLoaded', init);

/* ── Author / Ko-fi Footer ── */
document.body.insertAdjacentHTML('beforeend', LoveSparkFooter.render());

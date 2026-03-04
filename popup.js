/**
 * Anti Brainrot v1.0.3 — Popup Script
 * Settings UI with grouped collapsible sections
 */

// Theme system
const THEMES = ['dark', 'retro', 'beige', 'slate'];
function applyTheme(t) {
  THEMES.forEach(n => document.body.classList.remove('theme-' + n));
  document.body.classList.add('theme-' + t);
  const btn = document.getElementById('themeTab');
  if (btn) btn.textContent = t;
}
function cycleTheme() {
  const cur = THEMES.find(t => document.body.classList.contains('theme-' + t)) || 'retro';
  const next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
  applyTheme(next);
  browser.storage.local.set({ theme: next });
}
browser.storage.local.get(['theme', 'darkMode']).then(({ theme, darkMode }) => {
  if (!theme && darkMode) theme = 'dark';
  applyTheme(theme || 'retro');
});
document.getElementById('themeTab').addEventListener('click', cycleTheme);

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
}

document.addEventListener('DOMContentLoaded', init);

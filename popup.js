// Cross-browser compatibility
if (typeof browser === "undefined") {
  var browser = chrome;
}

/**
 * Anti Brainrot - Popup Script
 * Handles settings UI and saves preferences
 */

// Setting IDs that map to storage keys
const SETTING_IDS = [
  'masterToggle',
  'hideHomepage',
  'hideSidebar',
  'hideComments',
  'hideEndscreen',
  'hideShorts'
];

/**
 * Update the state of individual toggles based on master toggle
 */
function updateMasterToggleState() {
  const masterToggle = document.getElementById('masterToggle');
  const isEnabled = masterToggle.checked;

  SETTING_IDS.slice(1).forEach(id => {
    const checkbox = document.getElementById(id);
    if (!checkbox) return;

    const container = checkbox.closest('.setting');
    checkbox.disabled = !isEnabled;

    if (container) {
      container.classList.toggle('disabled', !isEnabled);
    }
  });
}

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');

  document.getElementById('themeIcon').textContent = isDark ? '☀️' : '🌙';

  browser.storage.local.set({ darkMode: isDark })
    .catch(error => console.error('Error saving dark mode:', error));
}

/**
 * Load dark mode preference
 */
function loadDarkMode() {
  browser.storage.local.get({ darkMode: false })
    .then(result => {
      if (result.darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('themeIcon').textContent = '☀️';
      }
    })
    .catch(error => console.error('Error loading dark mode:', error));
}

/**
 * Load saved settings and update checkboxes
 */
function loadSettings() {
  const defaults = {
    masterToggle: true,
    hideHomepage: true,
    hideSidebar: true,
    hideComments: true,
    hideEndscreen: true,
    hideShorts: true
  };

  browser.storage.local.get(defaults)
    .then(settings => {
      SETTING_IDS.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
          checkbox.checked = settings[id];
        }
      });

      updateMasterToggleState();
    })
    .catch(error => console.error('Error loading settings:', error));
}

/**
 * Save settings to storage
 */
function saveSettings() {
  const settings = {};

  SETTING_IDS.forEach(id => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      settings[id] = checkbox.checked;
    }
  });

  browser.storage.local.set(settings)
    .then(showStatus)
    .catch(error => console.error('Error saving settings:', error));
}

/**
 * Show "Settings saved!" status message
 */
function showStatus() {
  const status = document.getElementById('status');
  if (!status) return;

  status.classList.add('show');

  setTimeout(() => {
    status.classList.remove('show');
  }, 2000);
}

/**
 * Initialize popup
 */
function init() {
  loadDarkMode();
  loadSettings();

  const masterToggle = document.getElementById('masterToggle');
  if (masterToggle) {
    masterToggle.addEventListener('change', () => {
      updateMasterToggleState();
      saveSettings();
    });
  }

  SETTING_IDS.slice(1).forEach(id => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.addEventListener('change', saveSettings);
    }
  });

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleDarkMode);
  }
}

document.addEventListener('DOMContentLoaded', init);
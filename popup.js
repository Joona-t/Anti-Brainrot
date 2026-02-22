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

  // Enable/disable individual toggles
  SETTING_IDS.slice(1).forEach(id => {
    const checkbox = document.getElementById(id);
    const container = checkbox.closest('.setting');
    if (checkbox && container) {
      checkbox.disabled = !isEnabled;
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

  // Update icon
  document.getElementById('themeIcon').textContent = isDark ? '☀️' : '🌙';

  // Save preference
  console.log('Saving dark mode:', isDark);
  chrome.storage.local.set({ darkMode: isDark }).then(() => {
    console.log('Dark mode saved successfully');
  }).catch(error => {
    console.error('Error saving dark mode:', error);
  });
}

/**
 * Load dark mode preference
 */
function loadDarkMode() {
  chrome.storage.local.get({ darkMode: false }).then(result => {
    console.log('Loaded dark mode:', result.darkMode);
    if (result.darkMode) {
      document.body.classList.add('dark-mode');
      document.getElementById('themeIcon').textContent = '☀️';
    }
  }).catch(error => {
    console.error('Error loading dark mode:', error);
  });
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

  console.log('Loading settings with defaults:', defaults);

  chrome.storage.local.get(defaults).then(settings => {
    console.log('Loaded settings:', settings);

    SETTING_IDS.forEach(id => {
      const checkbox = document.getElementById(id);
      if (checkbox) {
        checkbox.checked = settings[id];
        console.log(`Set ${id} to ${settings[id]}`);
      }
    });

    // Update master toggle state after loading
    updateMasterToggleState();
  }).catch(error => {
    console.error('Error loading settings:', error);
  });
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

  console.log('Saving settings:', settings);

  chrome.storage.local.set(settings).then(() => {
    console.log('Settings saved successfully');

    // Show success message
    showStatus();

    // Reload all YouTube tabs to apply changes immediately
    reloadYouTubeTabs();
  }).catch(error => {
    console.error('Error saving settings:', error);
  });
}

/**
 * Show "Settings saved!" status message
 */
function showStatus() {
  const status = document.getElementById('status');
  status.classList.add('show');

  setTimeout(() => {
    status.classList.remove('show');
  }, 2000);
}

/**
 * Reload all open YouTube tabs
 */
function reloadYouTubeTabs() {
  chrome.tabs.query({ url: "*://*.youtube.com/*" }).then(tabs => {
    tabs.forEach(tab => {
      chrome.tabs.reload(tab.id);
    });
  }).catch(error => {
    console.error('Error reloading tabs:', error);
  });
}

/**
 * Initialize popup
 */
function init() {
  // Load dark mode preference
  loadDarkMode();

  // Load current settings
  loadSettings();

  // Add change listener to master toggle
  const masterToggle = document.getElementById('masterToggle');
  if (masterToggle) {
    masterToggle.addEventListener('change', () => {
      updateMasterToggleState();
      saveSettings();
    });
  }

  // Add change listeners to all other checkboxes
  SETTING_IDS.slice(1).forEach(id => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.addEventListener('change', saveSettings);
    }
  });

  // Add theme toggle listener
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleDarkMode);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

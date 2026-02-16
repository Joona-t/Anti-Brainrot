/**
 * Anti Brainrot - Content Script
 * Manages hiding/showing YouTube elements based on user preferences
 */

// Default settings - all features enabled
const DEFAULT_SETTINGS = {
  masterToggle: true,
  hideHomepage: true,
  hideSidebar: true,
  hideComments: true,
  hideEndscreen: true,
  hideShorts: true
};

// Current settings (loaded from storage)
let settings = { ...DEFAULT_SETTINGS };

/**
 * Apply CSS classes to body based on enabled features
 */
function applySettings() {
  const body = document.body;

  if (!body) {
    // Body not ready yet, try again soon
    setTimeout(applySettings, 100);
    return;
  }

  console.log('Anti Brainrot: Applying settings:', settings);

  // If master toggle is off, remove all classes (disable all features)
  if (settings.masterToggle === false) {
    console.log('Anti Brainrot: Master toggle is OFF - removing all classes');
    body.classList.remove(
      'unhook-hide-homepage',
      'unhook-hide-sidebar',
      'unhook-hide-comments',
      'unhook-hide-endscreen',
      'unhook-hide-shorts'
    );
    return;
  }

  // Apply or remove classes based on settings
  body.classList.toggle('unhook-hide-homepage', settings.hideHomepage);
  body.classList.toggle('unhook-hide-sidebar', settings.hideSidebar);
  body.classList.toggle('unhook-hide-comments', settings.hideComments);
  body.classList.toggle('unhook-hide-endscreen', settings.hideEndscreen);
  body.classList.toggle('unhook-hide-shorts', settings.hideShorts);

  console.log('Anti Brainrot: Classes applied');
}

/**
 * Load settings from browser storage
 */
function loadSettings() {
  // Use Firefox's browser API (which is promisified)
  console.log('Anti Brainrot: Loading settings from storage');

  browser.storage.local.get(DEFAULT_SETTINGS).then(result => {
    console.log('Anti Brainrot: Loaded settings:', result);
    settings = result;
    applySettings();
  }).catch(error => {
    console.error('Anti Brainrot: Error loading settings', error);
    applySettings(); // Apply defaults on error
  });
}

/**
 * Initialize the extension
 */
function init() {
  loadSettings();

  // Re-apply settings when navigating (YouTube is a SPA)
  // Watch for URL changes
  let lastUrl = location.href;

  // Use MutationObserver to detect navigation
  const observer = new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      // Re-apply settings after navigation
      setTimeout(applySettings, 100);
    }
  });

  // Observe the entire document for changes
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

// Listen for settings changes from popup
browser.storage.onChanged.addListener((changes, areaName) => {
  console.log('Anti Brainrot: Storage changed:', areaName, changes);
  if (areaName === 'local') {
    // Reload settings and re-apply
    loadSettings();
  }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

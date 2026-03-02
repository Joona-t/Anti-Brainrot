/**
 * Anti Brainrot v2.0.0 — Content Script
 * Hides YouTube distractions via CSS body classes + autoplay disable
 */

const DEFAULT_SETTINGS = {
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

const FEATURE_CLASSES = {
  hideHomepage:     'ab-hide-homepage',
  hideSidebar:      'ab-hide-sidebar',
  hideEndscreen:    'ab-hide-endscreen',
  hideShorts:       'ab-hide-shorts',
  hideMix:          'ab-hide-mix',
  hideComments:     'ab-hide-comments',
  hideDescription:  'ab-hide-description',
  hideLiveChat:     'ab-hide-livechat',
  hideMerch:        'ab-hide-merch',
  hideVideoButtons: 'ab-hide-videobuttons',
  hideChannelInfo:  'ab-hide-channelinfo',
  hideNotifications:'ab-hide-notifications',
  hideAnnotations:  'ab-hide-annotations',
  hidePlaylist:     'ab-hide-playlist',
  disableAutoplay:  'ab-disable-autoplay'
};

let settings = { ...DEFAULT_SETTINGS };

function applySettings() {
  const body = document.body;
  if (!body) return;

  if (!settings.masterToggle) {
    for (const cls of Object.values(FEATURE_CLASSES)) {
      body.classList.remove(cls);
    }
    return;
  }

  for (const [key, cls] of Object.entries(FEATURE_CLASSES)) {
    body.classList.toggle(cls, !!settings[key]);
  }
}

function disableAutoplay() {
  if (!settings.disableAutoplay || !settings.masterToggle) return;

  let attempts = 0;
  const maxAttempts = 17;

  function tryDisable() {
    const toggle = document.querySelector('.ytp-autonav-toggle-button');
    if (toggle && toggle.getAttribute('aria-checked') === 'true') {
      toggle.click();
      return;
    }
    if (++attempts < maxAttempts) {
      setTimeout(tryDisable, 300);
    }
  }

  tryDisable();
}

function loadSettings() {
  browser.storage.local.get(DEFAULT_SETTINGS).then(result => {
    settings = result;
    applySettings();
    disableAutoplay();
  }).catch(() => {
    applySettings();
  });
}

function onNavigate() {
  applySettings();
  disableAutoplay();
}

function init() {
  loadSettings();
  document.addEventListener('yt-navigate-finish', onNavigate);
  window.addEventListener('popstate', onNavigate);

  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      loadSettings();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

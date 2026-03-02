/**
 * Anti Brainrot v2.1.0 — Content Script
 * Hides YouTube distractions via CSS body classes + autoplay disable
 * Architecture: hide-by-default, show-on-demand
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
  hideHomepage:     'ab-show-homepage',
  hideSidebar:      'ab-show-sidebar',
  hideEndscreen:    'ab-show-endscreen',
  hideShorts:       'ab-show-shorts',
  hideMix:          'ab-show-mix',
  hideComments:     'ab-show-comments',
  hideDescription:  'ab-show-description',
  hideLiveChat:     'ab-show-livechat',
  hideMerch:        'ab-show-merch',
  hideVideoButtons: 'ab-show-videobuttons',
  hideChannelInfo:  'ab-show-channelinfo',
  hideNotifications:'ab-show-notifications',
  hideAnnotations:  'ab-show-annotations',
  hidePlaylist:     'ab-show-playlist',
  disableAutoplay:  'ab-show-autoplay'
};

let settings = { ...DEFAULT_SETTINGS };

function applySettings() {
  const body = document.body;
  if (!body) return;

  if (!settings.masterToggle) {
    for (const cls of Object.values(FEATURE_CLASSES)) {
      body.classList.add(cls);
    }
    return;
  }

  for (const [key, cls] of Object.entries(FEATURE_CLASSES)) {
    body.classList.toggle(cls, !settings[key]);
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

/**
 * Anti Brainrot v1.0.3 — Content Script
 * Hides YouTube distractions via CSS body classes + autoplay disable
 * Architecture: hide-by-default, show-on-demand
 *
 * CSS hides everything at document_start via :not(.ab-show-*) selectors.
 * This script adds ab-show-* classes for features the user wants visible.
 * Storage read starts immediately at document_start — not waiting for body.
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
let didInit = false;

/* ── Core: apply body classes based on settings ─────────────────────────── */

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

/* ── Settings loading ───────────────────────────────────────────────────── */

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

/* ── Initialization ─────────────────────────────────────────────────────── */

function init() {
  if (didInit) return;
  didInit = true;

  applySettings();

  // YouTube SPA navigation
  document.addEventListener('yt-navigate-finish', onNavigate);
  document.addEventListener('yt-page-data-updated', onNavigate);
  window.addEventListener('popstate', onNavigate);

  // Settings changes from popup
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      loadSettings();
    }
  });
}

/* ── Bootstrap: start ASAP, don't wait ──────────────────────────────────── */

// 1. Start storage read IMMEDIATELY at document_start (before body exists)
//    This runs in parallel with HTML parsing — shaves ~100ms off the delay.
loadSettings();

// 2. Detect body creation as early as possible, then init
if (document.body) {
  init();
} else {
  // MutationObserver fires the instant <body> is created by the parser —
  // significantly earlier than DOMContentLoaded.
  const observer = new MutationObserver(() => {
    if (document.body) {
      observer.disconnect();
      init();
    }
  });
  observer.observe(document.documentElement, { childList: true });

  // Fallback: DOMContentLoaded (in case MutationObserver misses it)
  document.addEventListener('DOMContentLoaded', () => {
    observer.disconnect();
    init();
  });
}

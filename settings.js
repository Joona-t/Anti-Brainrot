'use strict';

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
  disableAutoplay: true,
  darkMode: false,
  theme: 'retro'
};

function showStatus() {
  const status = document.getElementById('status');
  status.classList.add('show');
  setTimeout(() => status.classList.remove('show'), 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Show version from manifest
  const manifest = browser.runtime.getManifest();
  document.getElementById('versionLabel').textContent = 'v' + manifest.version;

  // Reset button
  document.getElementById('resetBtn').addEventListener('click', () => {
    browser.storage.local.set(DEFAULTS).then(() => {
      showStatus();
    });
  });
});

document.body.insertAdjacentHTML('beforeend', LoveSparkFooter.render());

/* lovespark-theme.js — Shared theme dropdown for LoveSpark extension popups
   Canonical source: Extensions/infrastructure/lovespark-shared-lib/
   Usage in popup.html: <script src="lib/lovespark-theme.js"></script> */
'use strict';

const LoveSparkTheme = (() => {
  const THEMES = ['retro', 'dark', 'beige', 'slate'];
  const THEME_NAMES = { retro: 'Retro Pink', dark: 'Dark', beige: 'Beige', slate: 'Slate' };

  function apply(theme) {
    THEMES.forEach(t => document.body.classList.remove('theme-' + t));
    document.body.classList.add('theme-' + theme);
    const label = document.getElementById('themeLabel');
    if (label) label.textContent = THEME_NAMES[theme] || theme;
    document.querySelectorAll('.theme-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.theme === theme);
    });
  }

  function init() {
    const toggle = document.getElementById('themeToggle');
    const menu = document.getElementById('themeMenu');

    if (toggle && menu) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('open');
      });

      menu.addEventListener('click', (e) => {
        const opt = e.target.closest('.theme-option');
        if (!opt) return;
        const theme = opt.dataset.theme;
        apply(theme);
        chrome.storage.local.set({ theme });
        menu.classList.remove('open');
      });

      document.addEventListener('click', () => menu.classList.remove('open'));
    }

    chrome.storage.local.get(['theme', 'darkMode'], ({ theme, darkMode }) => {
      if (!theme && darkMode) theme = 'dark';
      apply(theme || 'retro');
    });
  }

  return { apply, init, THEMES, THEME_NAMES };
})();

if (typeof globalThis !== 'undefined') globalThis.LoveSparkTheme = LoveSparkTheme;

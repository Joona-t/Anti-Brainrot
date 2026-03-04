/* lovespark-badge.js — Shared badge management for LoveSpark extensions
   Canonical source: Extensions/infrastructure/lovespark-shared-lib/
   Usage in background.js: importScripts('lib/lovespark-badge.js') */
'use strict';

const LoveSparkBadge = (() => {
  const PINK = '#FF69B4';
  const OFF_GRAY = '#666666';

  async function update(enabledKey, countKey) {
    const data = await chrome.storage.local.get([enabledKey, countKey]);

    if (data[enabledKey] === false) {
      chrome.action.setBadgeText({ text: 'OFF' });
      chrome.action.setBadgeBackgroundColor({ color: OFF_GRAY });
      return;
    }

    const count = data[countKey] || 0;
    const text = count > 999 ? '999+' : count > 0 ? String(count) : '';
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color: PINK });
    try { chrome.action.setBadgeTextColor({ color: '#FFFFFF' }); } catch (_) {}
  }

  function init() {
    chrome.action.setBadgeBackgroundColor({ color: PINK });
  }

  return { update, init };
})();

if (typeof globalThis !== 'undefined') globalThis.LoveSparkBadge = LoveSparkBadge;

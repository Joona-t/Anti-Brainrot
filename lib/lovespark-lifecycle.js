/* lovespark-lifecycle.js — Shared install/startup/message patterns
   Canonical source: Extensions/infrastructure/lovespark-shared-lib/
   Usage in background.js: importScripts('lib/lovespark-lifecycle.js') */
'use strict';

const LoveSparkLifecycle = (() => {
  async function initDefaults(defaults) {
    const data = await chrome.storage.local.get(Object.keys(defaults));
    const updates = {};
    for (const key of Object.keys(defaults)) {
      if (data[key] === undefined) updates[key] = defaults[key];
    }
    if (Object.keys(updates).length) await chrome.storage.local.set(updates);
  }

  function setupMessageHandler(handler) {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      handler(msg, sender).then(sendResponse).catch(() => sendResponse({ error: true }));
      return true;
    });
  }

  return { initDefaults, setupMessageHandler };
})();

if (typeof globalThis !== 'undefined') globalThis.LoveSparkLifecycle = LoveSparkLifecycle;

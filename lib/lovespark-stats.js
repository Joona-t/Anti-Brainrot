/* lovespark-stats.js — Shared stats tracking for LoveSpark extensions
   Canonical source: Extensions/infrastructure/lovespark-shared-lib/
   Usage in background.js: importScripts('lib/lovespark-stats.js') */
'use strict';

const LoveSparkStats = (() => {
  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  async function checkDailyReset(todayKey, dateKey) {
    dateKey = dateKey || 'lastResetDate';
    const data = await chrome.storage.local.get([dateKey, todayKey]);
    const today = todayStr();
    if (data[dateKey] !== today) {
      await chrome.storage.local.set({ [todayKey]: 0, [dateKey]: today });
      return true;
    }
    return false;
  }

  function createAccumulator(todayKey, totalKey, onFlush) {
    let pending = 0;
    let timer = null;

    async function flush() {
      timer = null;
      const n = pending;
      if (n === 0) return;
      pending = 0;
      const data = await chrome.storage.local.get([todayKey, totalKey]);
      await chrome.storage.local.set({
        [todayKey]: (data[todayKey] || 0) + n,
        [totalKey]: (data[totalKey] || 0) + n,
      });
      if (onFlush) onFlush();
    }

    function bump(n) {
      pending += (n || 1);
      if (!timer) timer = setTimeout(flush, 500);
    }

    return { bump, flush };
  }

  return { todayStr, checkDailyReset, createAccumulator };
})();

if (typeof globalThis !== 'undefined') globalThis.LoveSparkStats = LoveSparkStats;

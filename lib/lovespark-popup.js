/* lovespark-popup.js — Shared popup UI helpers for LoveSpark extensions
   Canonical source: Extensions/infrastructure/lovespark-shared-lib/
   Usage in popup.html: <script src="lib/lovespark-popup.js"></script> */
'use strict';

const LoveSparkPopup = (() => {
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCount(el, from, to, duration) {
    duration = duration || 600;
    if (from === to) { el.textContent = to.toLocaleString(); return; }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(from + (to - from) * easeOut(t)).toLocaleString();
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function pop(el) {
    el.classList.remove('popping');
    void el.offsetWidth;
    el.classList.add('popping');
    el.addEventListener('animationend', () => el.classList.remove('popping'), { once: true });
  }

  function rotateMessages(el, messages, interval) {
    interval = interval || 3500;
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % messages.length;
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = messages[idx];
        el.style.opacity = '1';
      }, 200);
    }, interval);
  }

  return { animateCount, pop, rotateMessages };
})();

if (typeof globalThis !== 'undefined') globalThis.LoveSparkPopup = LoveSparkPopup;

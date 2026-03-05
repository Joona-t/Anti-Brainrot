/* lovespark-footer.js — Shared author credit & Ko-fi footer
   Canonical source: Extensions/infrastructure/lovespark-shared-lib/
   Usage in popup.html: <script src="lib/lovespark-footer.js"></script>
   Usage in popup.js:   document.body.insertAdjacentHTML('beforeend', LoveSparkFooter.render()); */
'use strict';

const LoveSparkFooter = (() => {
  function render() {
    return '<div class="ls-footer">' +
      '<span class="ls-footer-author">LoveSpark by Joona Tyrninoksa</span>' +
      '<span class="ls-footer-tagline">Crafted with intention \u{1F495}</span>' +
      '<a href="https://ko-fi.com/joonat" target="_blank" rel="noopener noreferrer" class="ls-footer-kofi">' +
        '\u2764\uFE0F Support on Ko-fi' +
      '</a>' +
    '</div>';
  }

  return { render };
})();

if (typeof globalThis !== 'undefined') globalThis.LoveSparkFooter = LoveSparkFooter;

/* lovespark-footer.js — Shared author credit & Ko-fi footer
   Canonical source: Extensions/infrastructure/lovespark-shared-lib/
   Usage in popup.html: <script src="lib/lovespark-footer.js"></script>
   Usage in popup.js:   document.body.insertAdjacentHTML('beforeend', LoveSparkFooter.render()); */
'use strict';

const LoveSparkFooter = (() => {
  function render() {
    return '<footer class="ls-footer">' +
      '<span class="ls-footer-suite">LoveSpark Suite \u{1F495}</span>' +
      '<a href="https://ko-fi.com/joonat" target="_blank" rel="noopener noreferrer" class="ls-kofi-btn">' +
        '\u2615 Support on Ko-fi' +
      '</a>' +
      '<span class="ls-footer-credit">LoveSpark by Joona Tyrninoksa \u00B7 Crafted with intention \u{1F495}</span>' +
    '</footer>';
  }

  return { render };
})();

if (typeof globalThis !== 'undefined') globalThis.LoveSparkFooter = LoveSparkFooter;

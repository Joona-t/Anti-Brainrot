/* lovespark-footer.js — Shared author credit & Ko-fi footer
   Canonical source: Extensions/infrastructure/lovespark-shared-lib/
   Usage in popup.html: <script src="lib/lovespark-footer.js"></script>
   Usage in popup.js:   document.body.insertAdjacentHTML('beforeend', LoveSparkFooter.render()); */
'use strict';

const LoveSparkFooter = (() => {
  function render() {
    return '<footer class="ls-footer">' +
      '<a href="https://lovespark.love/" target="_blank" rel="noopener noreferrer" class="ls-suite-btn">' +
        'LoveSpark Suite \u{1F495}' +
      '</a>' +
      '<a href="https://ko-fi.com/joonat" target="_blank" rel="noopener noreferrer" class="ls-kofi-btn">' +
        '\u2615 Support on Ko-fi' +
      '</a>' +
      '<a href="mailto:joona@lovespark.love?subject=Bug Report" class="ls-bug-btn">' +
        '\u{1F41E} Report a Bug' +
      '</a>' +
      '<span class="ls-footer-credit">LoveSpark by Joona Tyrninoksa \u00B7 Crafted with intention \u{1F495}</span>' +
    '</footer>';
  }

  return { render };
})();

if (typeof globalThis !== 'undefined') globalThis.LoveSparkFooter = LoveSparkFooter;

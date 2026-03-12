# Anti Brainrot

**Reclaim your focus by removing YouTube's algorithmic distractions**

Part of the [LoveSpark Suite](https://joona-t.github.io) — free, open-source, privacy-first tools for a calmer internet.

## Features

### Feed & Recommendations
- Hide Homepage Feed
- Hide Sidebar Recommendations
- Hide End Screen Suggestions
- Hide Shorts
- Hide Mix / Radio Playlists

### Video Page
- Hide Comments
- Hide Description
- Hide Live Chat
- Hide Merch / Tickets / Offers

### UI & Controls
- Hide Video Buttons (like, share, save)
- Hide Channel Info (name, avatar, subscribe)
- Hide Notification Bell
- Hide Annotations / Info Cards
- Hide Playlist Panel

### Behavior
- Disable Autoplay

All settings are toggleable individually via the extension popup.

## Installation

### Chrome Web Store
[Install from Chrome Web Store](https://chromewebstore.google.com/detail/anti-brainrot)

### Firefox Add-ons
[Install from Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/anti-brainrot/)

### Edge Add-ons
[Install from Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/anti-brainrot)

### Manual Installation (for testing)

**Chrome/Edge:**
1. Open `chrome://extensions`
2. Enable Developer mode
3. Click "Load unpacked"
4. Select the `Anti-Brainrot` folder

**Firefox:**
1. Open `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on..."
3. Select the `manifest.json` file

## How It Works

Anti Brainrot uses CSS class toggles on `document.body` to show/hide YouTube elements. Settings propagate instantly via `chrome.storage.onChanged` — no page reload needed. YouTube SPA navigation is handled via the native `yt-navigate-finish` event.

## Permissions

- **storage** — Save your toggle preferences locally
- **youtube.com access** — Inject CSS rules to hide elements (via static content scripts)

That's it. No `tabs`, no `host_permissions`, no remote connections.

## Privacy

- No data collection
- No tracking
- No external connections
- All settings stored locally
- [Privacy Policy](PRIVACY.md)

## File Structure

```
Anti-Brainrot/
  manifest.json
  content.js
  styles.css
  popup.html
  popup.css
  popup.js
  mascot.png
  PRIVACY.md
  README.md
  lib/
    browser-polyfill.min.js
  icons/
    icon16.png
    icon48.png
    icon128.png
```

## License

MIT License

Copyright (c) 2025-2026 Joona Tyrninoksa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Credits

Inspired by the Unhook extension. Built with love as part of the LoveSpark Suite.

---

**Version:** 1.0.9
**Last Updated:** February 2026

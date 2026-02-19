# Anti Brainrot (Chrome/Edge Version)

**Reclaim your focus by removing YouTube's algorithmic distractions**

A Chrome/Edge extension that removes distracting elements from YouTube to help you stay focused on the content you choose to watch.

## Features

✅ **Hide Homepage Feed** - Remove all video recommendations on the YouTube homepage
✅ **Hide Sidebar Recommendations** - Remove the entire right sidebar of related videos
✅ **Hide Comments Section** - Remove all comments below videos
✅ **Hide End Screen Suggestions** - Remove video suggestions that appear at the end
✅ **Hide Shorts** - Remove shorts shelf, shorts button, and shorts tabs
✅ **Customizable Settings** - Toggle each feature on/off individually via popup

## Installation

### Method 1: Developer Mode (Chrome)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **"Load unpacked"**
4. Select the `anti-brainrot-chrome` folder
5. Visit YouTube - all distractions should now be hidden!

### Method 2: Developer Mode (Edge)

1. Open Edge and navigate to `edge://extensions/`
2. Enable **Developer mode** (toggle in bottom-left)
3. Click **"Load unpacked"**
4. Select the `anti-brainrot-chrome` folder
5. Visit YouTube - distractions removed!

### Method 3: Chrome Web Store (Future)

This extension can be published to the Chrome Web Store for easier installation. Contact the developer for the published version.

## Usage

### Accessing Settings

Click the extension icon in your browser toolbar to open the settings popup.

### Customizing Features

Toggle any feature on or off:
- ☑️ Checked = Feature enabled (element hidden)
- ☐ Unchecked = Feature disabled (element visible)

Changes are saved automatically and applied immediately to all open YouTube tabs.

## How It Works

Anti Brainrot uses Manifest V3 with cross-browser compatibility:

- **Browser Polyfill** - Automatically detects and uses Chrome or Firefox APIs
- **Content Script** (`content.js`) - Monitors YouTube pages and applies hiding rules
- **MutationObserver** - Detects navigation in YouTube's single-page app
- **CSS Classes** (`styles.css`) - Hides elements using `display: none !important`
- **Storage API** - Saves your preferences across browser sessions

## Permissions Explained

- **`storage`** - Save your toggle preferences
- **`tabs`** - Reload YouTube tabs when settings change
- **`*://*.youtube.com/*`** (host_permissions) - Access YouTube pages to hide elements

## Browser Compatibility

- ✅ **Chrome** (Manifest V3)
- ✅ **Edge** (Manifest V3)
- ✅ **Brave** (Chromium-based, should work)
- ✅ **Opera** (Chromium-based, should work)
- ⚠️ **Firefox** - Use the Firefox-specific version instead (uses Manifest V2)

## Differences from Firefox Version

This Chrome version uses:
- **Manifest V3** (instead of V2)
- **Browser API polyfill** for cross-browser compatibility
- **`host_permissions`** (separated from permissions in V3)
- **`action`** field (instead of `browser_action`)

All functionality remains identical to the Firefox version.

## Troubleshooting

**Elements not hiding?**
- Make sure the feature is enabled in the extension popup
- Try refreshing the YouTube page
- Check if YouTube has updated their HTML structure

**Extension not loading?**
- Ensure Developer mode is enabled
- Make sure you selected the correct folder (not just manifest.json)
- Check Chrome's Extensions page for error messages

**Settings not saving?**
- Check that the extension has storage permissions
- Try re-loading the extension in Developer mode

**Chrome says "This extension may soon no longer be supported"**
- This warning appears for Manifest V2 extensions. This version uses V3, so you won't see this warning.

## Development

This extension uses Manifest V3 and is compatible with Chrome, Edge, and other Chromium-based browsers.

### File Structure
```
anti-brainrot-chrome/
├── manifest.json          # Manifest V3 configuration
├── content.js             # Main logic with browser polyfill
├── styles.css             # CSS rules for hiding elements
├── popup.html             # Settings UI
├── popup.js               # Settings logic with browser polyfill
├── icons/
│   └── icon48.png         # Extension icon
└── README.md              # This file
```

### Key Technical Details
- **Manifest V3**: Latest extension standard required by Chrome
- **Browser Polyfill**: `if (typeof browser === "undefined") var browser = chrome;`
- **Host Permissions**: Separated from regular permissions in V3
- **Action API**: Replaces browser_action from V2

## Privacy

Anti Brainrot does NOT:
- ❌ Collect any data
- ❌ Track your browsing
- ❌ Send information anywhere
- ❌ Require an account

All settings are stored locally in your browser.

## Publishing to Stores

### Chrome Web Store
1. Create a developer account ($5 one-time fee)
2. Zip the `anti-brainrot-chrome` folder
3. Upload to Chrome Web Store Developer Dashboard
4. Fill in store listing details
5. Submit for review

### Microsoft Edge Add-ons
1. Create a Microsoft Partner Center account (free)
2. Zip the extension folder
3. Upload to Edge Add-ons dashboard
4. Complete listing information
5. Submit for review

## License

Free to use, modify, and distribute.

## Credits

Inspired by the original Unhook extension. Built for educational purposes and personal productivity.

---

**Version:** 1.0.0 (Manifest V3)
**Last Updated:** February 2026
**Compatible with:** Chrome, Edge, Brave, Opera, and other Chromium-based browsers

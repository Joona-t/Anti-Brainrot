# Anti Brainrot

**Reclaim your focus by removing YouTube's algorithmic distractions**

A Firefox extension that removes distracting elements from YouTube to help you stay focused on the content you choose to watch.

## Features

✅ **Hide Homepage Feed** - Remove all video recommendations on the YouTube homepage
✅ **Hide Sidebar Recommendations** - Remove the entire right sidebar of related videos
✅ **Hide Comments Section** - Remove all comments below videos
✅ **Hide End Screen Suggestions** - Remove video suggestions that appear at the end
✅ **Hide Shorts** - Remove shorts shelf, shorts button, and shorts tabs
✅ **Customizable Settings** - Toggle each feature on/off individually via popup

## Installation (Firefox)

### Method 1: Temporary Installation (for testing)

1. Open Firefox
2. Navigate to `about:debugging#/runtime/this-firefox`
3. Click **"Load Temporary Add-on..."**
4. Navigate to the `youtube-unhook` folder and select the `manifest.json` file
5. Visit YouTube - all distractions should now be hidden!

**Note:** Temporary extensions are removed when Firefox restarts.

### Method 2: Permanent Installation (unsigned)

1. Open Firefox
2. Type `about:config` in the address bar and press Enter
3. Accept the warning
4. Search for `xpinstall.signatures.required`
5. Set it to `false` (double-click to toggle)
6. Type `about:addons` in the address bar
7. Click the gear icon ⚙️ → "Install Add-on From File..."
8. Select the `manifest.json` file from the `youtube-unhook` folder

## Usage

### Accessing Settings

Click the extension icon in your Firefox toolbar to open the settings popup.

### Customizing Features

Toggle any feature on or off:
- ☑️ Checked = Feature enabled (element hidden)
- ☐ Unchecked = Feature disabled (element visible)

Changes are saved automatically and applied immediately to all open YouTube tabs.

## How It Works

Anti Brainrot uses a content script with CSS classes to hide distracting elements:

- **Content Script** (`content.js`) - Monitors YouTube pages and applies hiding rules
- **MutationObserver** - Detects navigation in YouTube's single-page app
- **CSS Classes** (`styles.css`) - Hides elements using `display: none !important`
- **Storage API** - Saves your preferences across browser sessions

## Permissions Explained

- **`storage`** - Save your toggle preferences
- **`tabs`** - Reload YouTube tabs when settings change
- **`*://*.youtube.com/*`** - Access YouTube pages to hide elements

## Browser Compatibility

- ✅ **Firefox** (Recommended - built for Firefox)
- ⚠️ **Chrome/Edge** - May work but not officially supported (uses Manifest V2)

## Troubleshooting

**Elements not hiding?**
- Make sure the feature is enabled in the extension popup
- Try refreshing the YouTube page
- Check if YouTube has updated their HTML structure

**Extension not loading?**
- Ensure you selected the correct `manifest.json` file
- Check Firefox's Browser Console (Ctrl+Shift+J) for errors

**Settings not saving?**
- Check that the extension has storage permissions
- Try re-loading the extension

## Development

This extension is designed to be beginner-friendly for learning JavaScript and browser extensions.

### File Structure
```
youtube-unhook/
├── manifest.json          # Extension configuration
├── content.js             # Main logic (runs on YouTube pages)
├── styles.css             # CSS rules for hiding elements
├── popup.html             # Settings UI
├── popup.js               # Settings logic
├── icons/
│   └── icon48.png         # Extension icon
└── README.md              # This file
```

### Key Concepts
- **Content Scripts**: JavaScript that runs in the context of web pages
- **Browser Actions**: Extension icon and popup in the toolbar
- **Storage API**: Persisting user preferences
- **MutationObserver**: Watching for DOM changes in SPAs

## Privacy

Anti Brainrot does NOT:
- ❌ Collect any data
- ❌ Track your browsing
- ❌ Send information anywhere
- ❌ Require an account

All settings are stored locally in your browser.

## License

Free to use, modify, and distribute.

## Credits

Inspired by the original Unhook extension. Built for educational purposes and personal productivity.

---

**Version:** 1.0.0
**Last Updated:** February 2026

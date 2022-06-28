# About this directory

This folder is linked to Xcode so you need to be a bit careful with the contents.

## `web-extension/`

The containing folder is using a magic name, if it changes then the manifest.json generation script must be updated. You'd also need to update Xcode to know about the new name.

## `public/`

This folder is linked as a reference so you can freely add, remove, or rename files inside of this folder. Just be sure not to rename it or move it elsewhere.

## `locales/`

Same as `public/`, we could maybe fold this into `public/` but I'm not sure yet (it's unclear where `locales` is used in the `pbxproj`).


## `manifest.js`

This file dynamically writes the required `manifest.json` file at build-time. We dynamically render so we can test things more easily (via environment variables, etc.).

## `manifest.json`

Do not modify directly, use the `manifest.js` file.
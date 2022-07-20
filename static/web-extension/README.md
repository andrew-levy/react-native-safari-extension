# `web-extension`

The `web-extension` folder contains the files needed to configure your Safari Extension.

#### `index.js`

This is the entry point to your extension. You can import any component you want to render in the extension, and register it. Having it's own entry point necessary since you probably don't want to render your whole app inside of the web extension.

#### `manifest.json`

This file allows you to specify basic metadata about your extension such as the name and version, and can also specify aspects of your extension's functionality (such as background scripts, content scripts, and browser actions). Read more about this file [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json).

#### `public/`

This folder contains can contain JS, CSS, HTML, and images used by your extension. You can move, rename, and modify any files within this folder, as long as the reference to it in `manifest.json` is updated as well.

#### `public/index.html`

This file contains the HTML that will be rendered in the extension. By default, it renders the registered component in `web-extension/index.js`, but you can write your own HTML, CSS, and JS if you'd like.

#### `public/index.content.js`

This file contains the content script that will be injected into the web page. A content script is a part of your extension that runs in the context of a particular web page (as opposed to background scripts which are part of the extension, or scripts which are part of the website itself, such as those loaded using the `<script>` element).

#### `public/index.background.js`

This file contains the background script that will be injected into the web page. Background scripts enable you to monitor and react to events in the browser, such as navigating to a new page, removing a bookmark, or closing a tab.

#### `public/images/`

This folder contains images that will be used by your extension. You don't have to structure your files like this, as long as they are properly referenced in the manifest.

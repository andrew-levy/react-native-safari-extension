# react-native-safari-extension

Expo Config Plugin that generates a Safari Extension for iOS apps.

> **Warning** This plugin is a work in progress and hasn’t been adequately tested in the wild. I made the repository public to gather feedback and ask for help. Don’t use this plugin in production just yet!

## Installation

```console
yarn add react-native-safari-extension
```

## Configuring the plugin

Once you have installed the package, you can configure the plugin in your `app.json`. To customize your extension, you'll need to provide a `manifest` option, which should be a path to json file that conforms to [mdn's browser extension manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json#example) specification. Here's an example:

```json
{
  "expo": {
    "name": "app-with-extension",
    "slug": "app-with-extension",
    "version": "1.0.0",
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "bundleIdentifier": "com.example.myapp"
    },
    "plugins": [
      "react-native-safari-extension",
      { "manifest": "./src/myExtension/manifest.json" }
    ]
  }
}
```

In `manifest.json`, you can specify basic metadata about your extension such as the name and version, and can also specify aspects of your extension's functionality (such as background scripts, content scripts, and browser actions).

> **Note** If the `manifest` option is not provided, the plugin will fallback to a default `manifest.json`.

## Customizing the extension

To customize your extension, you can provide `html`, `js`, `css`, and other asset files in your `manifest.json`. You can put these anywhere in your project. Here's an example assuming the following file structure:

Assuming the file structure of your project is:

```
MyAppWithExtension/
└─── src/
    ├─── app/
    └─── extension/
        ├── images/
        ├── manifest.json
        ├── background.js
        ├── content.js
        ├── popup.js
        └── styles.css
```

Your `manifest.json might` look something like this:

```json
{
  "name": "My Extension",
  "version": "1.0.0",
  // Use the background key to include one or more background scripts, and optionally a background page in your extension. Background scripts are the place to put code that needs to maintain long-term state, or perform long-term operations, independently of the lifetime of any particular web pages or browser windows. Background scripts are loaded as soon as the extension is loaded and stay loaded until the extension is disabled or uninstalled, unless persistent is specified as false. You can use any of the WebExtension APIs in the script, as long as you have requested the necessary permissions.
  "background": {
    "scripts": ["background.js"]
  },
  // Instructs the browser to load content scripts into web pages whose URL matches a given pattern.
  "content_scripts": [
    {
      "matches": ["https://*/*"],
      "js": ["content.js"]
    }
  ],
  //A browser action is a button that your extension adds to the browser's toolbar. The button has an icon, and may optionally have a popup whose content is specified using HTML, CSS, and JavaScript.
  "browser_action": {
    // Tooltip for the button, displayed when the user moves their mouse over it. If the button is added to the browser's menu panel, this is also shown under the app icon.
    "default_title": "My Extension",
    // Use this to specify one or more icons for the browser action. The icon is shown in the browser toolbar by default.
    "default_icon": {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "64": "images/icon-64.png"
    }
  },
  // The icons key specifies icons for your extension. Those icons will be used to represent the extension in components such as the Add-ons Manager.
  "icons": {
    "48": "images/icon-48.png",
    "96": "images/icon-96.png",
    "128": "images/icon-128.png",
    "256": "images/icon-256.png",
    "512": "images/icon-512.png"
  }
}
```

## Generating the extension

1. Run `expo run:ios`. This will generate the extension and build/run your app.
2. Once the app has successfully launched, open the Safari app and navigate to any webpage. Press the <span style="font-size:12px">A</span><span style="font-size:16px">A</span> button in the address bar. This will open a context menu.
3. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below Mange Extensions.

## Acknowledgements

This was heavily inspired by [Benedikt](https://twitter.com/bndkt)'s [App Clip Conflig Plugin](https://github.com/bndkt/react-native-app-clip).

# react-native-safari-extension

Expo config plugin that generates a Safari Extension for iOS apps.

Not sure what Safari Extensions are? Check out [Apple's Safari Extension documentation](https://developer.apple.com/safari/extensions/) to learn more.

> **Warning** This plugin is a work in progress so there may be some bugs. Please feel free to contribute by reporting any issues or opening a PR.

## Installation

```console
yarn add react-native-safari-extension
```

## Configuring the plugin

Once you have installed the package, you can configure the plugin in your `app.json`.

The plugin takes in a `dir` option which specifies where the extension-related files should be output in your project. This directory will contain files responsible for customizing the extension's appearance and behavior.

Here's an example `app.json`:

```json
{
  "expo": {
    "name": "exampleApp",
    "slug": "exampleApp",
    "version": "1.0.0",
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "bundleIdentifier": "com.example.myapp"
    },
    "plugins": [["react-native-safari-extension", { "dir": "src/extension" }]]
  }
}
```

> **Note** If the `dir` option is not provided, the plugin will fallback to creating an `Extension/` folder in your project's root directory.

## Generating your extension

To generate the extension, run `expo prebuild -p ios`. This will generate the extension files in your project and take care of all the necesarry configurations so that it Just Works&trade;.

For example, if you specificed the `dir` option as `src/extension`, the plugin will generate the following files:

```
MyCoolApp/
└─── src/
    ├─── app/
    └─── extension/
        ├── _locales/
        ├── images/
        ├── manifest.json
        ├── background.js
        ├── content.js
        ├── popup.js
        ├── popup.css
        └── popup.html
```

To see the extension in action, you'll need to:

1. Run `expo run:ios`
2. Once the app has successfully launched, open the Safari app and navigate to any webpage. Press the <span style="font-size:12px">A</span><span style="font-size:16px">A</span> button in the address bar. This will open a context menu.
3. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below Mange Extensions.

> **Note** You can also manage your extensions from the Settings app: _Settings > Safari > Extensions_

## Customizing your extension

To customize your extension, you can edit the generated `html`, `js`, `css`, and other asset files.

You'll notice there is a `manifest.json` as well. The `manifest.json` file should conform to the [mdn browser extension manifest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json#example) specification, and is the only file that every extension must contain. Using `manifest.json`, you can specify basic metadata about your extension such as the name and version, and can also specify aspects of your extension's functionality (such as background scripts, content scripts, icons, and browser actions).

Once you make changes to your extension, re-run `expo prebuild -p ios`, and then run your application again to view the changes.

## Acknowledgements

This was heavily inspired by [Benedikt](https://twitter.com/bndkt)'s [App Clip Conflig Plugin](https://github.com/bndkt/react-native-app-clip).

# react-native-safari-extension

Expo config plugin that generates a Safari Extension for iOS apps.

Not sure what Safari Extensions are? Check out [Apple's Safari Extension documentation](https://developer.apple.com/safari/extensions/) to learn more.

> **Warning** This plugin is a work in progress so there may be some bugs. Please feel free to contribute by reporting any issues or opening a PR.

## Installation

```console
expo install react-native-safari-extension
# or
yarn add react-native-safari-extension
```

## Configuring the plugin

If you used the `expo install` command above, the plugin will already be added to the plugins section within your `app.json`. Nice!

If you used the `yarn add` command above, you'll need to add the plugin to your `app.json`:

```json
{
  "expo": {
    "name": "exampleApp",
    "slug": "exampleApp",
    "version": "1.0.0",
    "plugins": ["react-native-safari-extension"]
  }
}
```

## Generating your extension

To generate the extension, run `expo prebuild -p ios`. This will generate a folder named `web-extension` in the root of your project, containing the files needed for building your extension. The prebuild command also generates the `ios` folder configured with your extension as a target.

## Running your extension

To see the extension in action, you'll need to:

1. Run `expo run:ios`
2. Once the app has successfully launched, open the Safari app and navigate to any webpage. Press the AA button in the address bar. This will open a context menu.
3. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below Mange Extensions.

> **Note** You can also manage your extensions from the Settings app: _Settings > Safari > Extensions_

## Customizing your extension

To customize your extension, you can edit the files within `web-extension/public/`. When you make a change, you will need to re-run `expo run:ios` to see your changes.

In the future we hope to add hot reloading during development, as well as a way to use react-native-web to render React Native components in your extension. Ideally, you would render the contents of a `index.extension.js` file instead of manually writing html, css, and js.

## How it works

If you wanted to set up a Safari Extension manually, you would need to open your project in XCode, add a new target, configure the extension, and build and run your project. From there, all of your work for customizing the extension is within the `ios` folder.

Though these steps aren't too difficult, it forces you to think of your app and extension as two separate, unrelated projects living in two different places. And if you needed to delete your `ios` folder for some reason, you would have to remember to copy those files and redo the steps to create the extension again.

_Enter config plugins!_ Instead, this plugin allows you to write your extension code in the same place as your app, making it feel like you are never leaving JS land. When you run the prebuild command, all of the XCode configurations will be set up properly and your extension files will be referenced from the `ios` folder.

## Acknowledgements

This was heavily inspired by [Benedikt](https://twitter.com/bndkt)'s [App Clip Conflig Plugin](https://github.com/bndkt/react-native-app-clip).

Thanks to [Evan Bacon](https://twitter.com/Baconbrix) for his helpful guidance and suggestions.

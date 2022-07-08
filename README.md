# react-native-safari-extension

Expo config plugin that generates a Safari Extension for iOS apps.

Not sure what Safari Extensions are? Check out [Apple's Safari Extension documentation](https://developer.apple.com/safari/extensions/) to learn more.

> **Warning** This plugin is a work in progress so there may be some bugs. Please feel free to contribute by reporting any issues or opening a PR.

## Installation

```console
expo install react-native-safari-extension
```

This plugin has a dependency that you'll need to install as well

```console
yarn add @expo/webpack-config
```

## Configuring the plugin

If you used the `expo install` command above, the plugin will already be added to the plugins section within your `app.json`. Nice! If you used npm or yarn, then make sure the plugin is added.

```json
{
  "expo": {
    "name": "exampleApp",
    "plugins": ["react-native-safari-extension"]
  }
}
```

## Generating your extension

To generate the extension, run `expo prebuild -p ios`. This will:

- Generate a folder named `web-extension/` in the root of your project containing the files needed to build extension.

- Generate `webpack.config.js` in the root of your project. This is necessary for HMR to work during development.
- Generate the `ios/` folder in the root of your project. This will contain the native configurations for the extension.

## Running your extension

To see the extension in action, you'll need to:

1. Open `web-extension/index.js`. This is the entry point for your extension, similar to how ./index.js is the entry point for your app. Import the component you want to render in the extension, and register it.
2. Run `expo run:ios` to run the application.
3. Once the app has successfully launched, open the Safari app and navigate to any webpage. Press the AA button in the address bar. This will open a context menu.
4. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below Mange Extensions. Click on your extension to open it.

> **Note** You can also manage your extensions from the Settings app: _Settings > Safari > Extensions_

## Building your extension

This plugin makes it possible to leverage Hot Modue Replacement (HMR) while building Safari Extensions with very little setup. To enable HMR, you'll need to:

1. Make sure you have built your app with `expo run:ios`.
2. Run `expo start --web`. This will start a development server on `localhost:19006`. If this port is already in use, make sure to update the new port value in `webpack.config.js`.
3. Open your extension in Safari
4. Make a change in your app code. This will cause the extension to reload.

It's important that you dont change the name or location of the `web-extension/`, `public/`, `web-extension/manifest.json` and `web-extension/index.js` file.

## How it works

If you wanted to set up a Safari Extension manually, you would need to open your project in XCode, add a new target, configure the extension, and build and run your project. From there, all of your work for customizing the extension is within the `ios` folder.

Though these steps aren't too difficult, it forces you to think of your app and extension as two separate, unrelated projects living in two different places. And if you needed to delete your `ios` folder for some reason, you would have to remember to copy those files and redo the steps to create the extension again.

_Enter config plugins!_ Instead, this plugin allows you to write your extension code in the same place as your app, making it feel like you are never leaving JS land. When you run the prebuild command, all of the XCode configurations will be set up properly and your extension files will be referenced from the `ios` folder.

## Acknowledgements

This was heavily inspired by [Benedikt](https://twitter.com/bndkt)'s [App Clip Conflig Plugin](https://github.com/bndkt/react-native-app-clip).

Thanks to [Evan Bacon](https://twitter.com/Baconbrix) for his helpful guidance and suggestions.

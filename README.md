# react-native-safari-extension

Expo config plugin that generates a Safari Extension for iOS apps.

Not sure what Safari Extensions are? Check out [Apple's Safari Extension documentation](https://developer.apple.com/safari/extensions/) to learn more.

> **Warning** This plugin is a work in progress so there may be some bugs. Please feel free to contribute by reporting any issues or opening a PR.

## Getting Started

1. Install the plugin

```console
expo install react-native-safari-extension
```

2. Install its dependencies

```console
yarn add @expo/webpack-config
```

3. Configuring the plugin in your `app.json`. If you used the `expo install` command above, this should already be done for you!

```json
{
  "expo": {
    "name": "exampleApp",
    "plugins": ["react-native-safari-extension"]
  }
}
```

4. Add the following script to your `package.json`. This will be useful if you plan on leveraging Hot Module Replacement (HMR):

```json
{
  "scripts": {
    "extension": "WEB_EXTENSION=true expo start:web"
  }
}
```

> **Note** The `WEB_EXTENSION` environment variable is used to tell webpack that we are targeting the Safari Extension and not the web app version of our project. This is important because we need to use a different webpack configurations for each.

## Generating your extension

To generate the extension, run `expo prebuild -p ios`. This will:

- Generate a folder named `web-extension/` in the root of your project containing the files needed to build extension.

- Generate `webpack.config.js` in the root of your project. This is necessary for HMR to work during development.
- Generate the `ios/` folder in the root of your project. This will contain the native configurations for the extension.

> **Note** It's important that you dont change the name or location of `web-extension/`, `web-extension/public/`, `web-extension/manifest.json` and `web-extension/index.js`. That being said, you can move, rename, and modify any files within the `public/` folder.

## Running your extension

To see the extension in action, do the following:

1. Open `web-extension/index.js`. This is the entry point for your extension, similar to how `./index.js` is the entry point for your app. This is necessary since you probably don't want to render your whole app inside of the web extension. Go ahead and import the component you want to render in the extension, and register it.
2. Run `expo run:ios` to run the application.
3. Once the app has successfully launched, open the Safari app and navigate to any webpage and press the AA button in the address bar. This will open a context menu.
4. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below Manage Extensions. Click on your extension to open it.

> **Note** You can also manage your extensions from the Settings app: _Settings > Safari > Extensions_

## Developing your extension

This plugin makes it possible to leverage Hot Modue Replacement (HMR) while building Safari Extensions with very little setup. To start building with HMR:

0. Make sure you have built your app with `expo run:ios`.
1. Run `yarn extension` (see [#4 of Getting Started](#getting-started)). This will start a development server on `localhost:19006`. If this port is already in use, make sure to update the new port value in `webpack.config.js`.
2. Open your extension in Safari
3. Make a change in your app code. This will cause the extension to reload whenever you save a file.

## Why is this plugin useful?

#### Without this plugin:

- :confused: Have to manually add a new target in XCode
- :-1: All development for the extension is done within the `ios/` folder
- :snail: Have to rebuild everytime you make a change
- :sob: Have to write html, css, and js

#### With this plugin:

- :sunglasses: No need to touch XCode - just install the plugin and it will generate the necessary files
- :raised_hands: No development in the `ios/` folder
- :fire: HMR! You can make changes to your app and the extension will reload automatically when you save
- :tada: Can write JSX/TSX

## Acknowledgements

This was heavily inspired by [Benedikt](https://twitter.com/bndkt)'s [App Clip Conflig Plugin](https://github.com/bndkt/react-native-app-clip).

Thanks to [Evan Bacon](https://twitter.com/Baconbrix) for his helpful guidance and suggestions.

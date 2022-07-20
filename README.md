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

4. Add the following scripts to your `package.json`. These will be useful later on:

```json
{
  "scripts": {
    "start:extension": "WEB_EXTENSION=true expo start:web",
    "build:extension": "WEB_EXTENSION=true expo build:web"
  }
}
```

> **Note** The `WEB_EXTENSION` environment variable is used to tell webpack that we are targeting the Safari Extension and not the web app version of our project. This is important because we need to use a different webpack configurations for each.

## Generating your extension

To generate the extension, run `expo prebuild -p ios`. This will generate:

- `web-extension/` in the root of your project containing the files needed to build extension.
- `webpack.config.js` in the root of your project. This is necessary for HMR to work during development.
- `ios/` folder in the root of your project. This will contain the native configurations for the extension.

> **Note** Read more about the `web-extension/` folder [here](./web-extension/README.md).

## Running your extension

Follow these steps to see your extension in action:

1. Open `web-extension/index.js`. This is the entry point for your extension, similar to how `./index.js` is the entry point for your app. Go ahead and import the component you want to render in the extension, and register it.
2. Run `expo run:ios` to run the application.
3. Once the app has successfully launched, open the Safari app, navigate to any webpage, and press the AA button in the address bar. This will open a context menu.
4. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below Manage Extensions. Click on your extension to open it.

> **Note** You can also manage your extensions from the Settings app: _Settings > Safari > Extensions_

## Developing your extension

This plugin makes it possible to leverage Hot Modue Replacement (HMR) while building Safari Extensions with very little setup. To start building with HMR:

1. Make sure your app is running
2. Run `yarn start:extension` (see [#4 of Getting Started](#getting-started)) to start a development server on `localhost:19006` with HMR enabled
3. Open your extension in Safari
4. Make a change in your app code - this will cause the extension to reload whenever you save a file

## Building for Production

Once you are ready to build your project in a non-development environment (e.g. with `eas build`), you first need to generate the static files for your extension. This is similar to a production build for your expo web app. To do this:

1. Run `yarn build:extension` (see [#4 of Getting Started](#getting-started)). This will generate the static js files and output them here: `web-extension/public/static/js`.
2. Run `expo run:ios`

Anytime you need to switch from development to production, and vice versa, make sure to re-run your app.

## Why is this plugin useful?

#### Without this plugin:

- :confused: Have to manually add a new target in XCode
- :-1: All development for the extension is done within the `ios/` folder
- :snail: Have to rebuild everytime you make a change
- :sob: Have to write your own HMTL, CSS, and JS

#### With this plugin:

- :sunglasses: No need to touch XCode
- :raised_hands: No development in the `ios/` folder
- :fire: HMR! You can make changes to your code and the extension will reload automatically when you save
- :tada: Can write JSX/TSX

## Acknowledgements

This was heavily inspired by [Benedikt](https://twitter.com/bndkt)'s [App Clip Conflig Plugin](https://github.com/bndkt/react-native-app-clip).

Thanks to [Evan Bacon](https://twitter.com/Baconbrix) for his helpful guidance and suggestions.

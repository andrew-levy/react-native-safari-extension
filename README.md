[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/hugemathguy)

# react-native-safari-extension

> **Warning** This plugin is a work in progress so there may be some bugs. Please feel free to contribute by reporting any issues or opening a PR.

## What is it?

An [Expo Config Plugin](https://docs.expo.dev/guides/config-plugins/) that allows you to add a Safari Extension to your iOS apps.

> **Note** Not sure what Safari Extensions are? Check out [Apple's Safari Extension documentation](https://developer.apple.com/safari/extensions/) to learn more.

There are two workflows for using this plugin:

1. **[Experimental]** Render React Native web inside of your extension. This uses Expo web and Metro to output your React Native compononents inside of the extension popup. You can use Fast Refresh to see your changes in real time.
2. **[Basic]** Build your own extension using HTML, CSS, and vanilla JavaScript. Fast Refresh is not supported in this workflow.

## Getting Started

### Install the plugin

```console
npx expo install react-native-safari-extension
```

If you plan on using the Experimental workflow, also install the following dependencies:

```console
npx expo install react-native-web@~0.19.6 react-dom@18.2.0
```

### Configure the plugin

Configure the plugin in your `app.json`. Specify a `folderName` for where your extension files will live. If you are using the Experimental workflow, also specify a `web.bundler` to use metro as your bundler.

```json
{
  "expo": {
    "name": "myApp",
    "plugins": [
      ["react-native-safari-extension", { "folderName": "MyExtension" }]
    ],
    "web": {
      "bundler": "metro" // <-- only needed for Experimental workflow
    }
  }
}
```

### Add your extension files

Add your extension files to a folder with the name provided above (this folder should be in the root of your project). You can download this [sample extension]() to get started. Your project structure should look like this:

```console
MyApp/
├── app/
├── app.json
├── MyExtension # <-- the folder name you provided in the config
│   ├── public/ # <-- where your extension resource files live.
│   └── Info.plist
|   └── manifest.json
│   └── SafariExtensionHandler.swift
├── node_modules/
├── package.json
└── ...
```

> **Note** The folder name must match the name you provided in the plugin config. All of your scripts and resources must live in a folder with the name `public`.

### Prebuild + Build your app

If you are using EAS to build your app, run a build using eas-cli.

```console
eas build --platform ios
```

Or if you're building locally:

```console
npx expo prebuild -p ios --clean
npx expo run:ios
```

### Developing your app

Once the app has successfully run, o pen the Safari app, navigate to any webpage, and press the `AA` button in the address bar. This will open a context menu. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below Manage Extensions. Click on your extension to open it.

> **Note** You can also manage your extensions from the Settings app: _Settings > Safari > Extensions_

### Production

Before publishing your app, there are a few things you need to do:

1. Create a static web build for your app: `npx expo export --platform web`
2. In your extensions `popup.html` file, change the `src` attribute of the `script` tag to point to the `index.html` file in your web build.

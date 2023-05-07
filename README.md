# react-native-safari-extension

> **Warning** This plugin is a work in progress so there may be some bugs. Please feel free to contribute by reporting any issues or opening a PR.

## What is it?

An [Expo Config Plugin](https://docs.expo.dev/guides/config-plugins/) that allows you to add a Safari Extension to your iOS apps.

> **Note** Not sure what Safari Extensions are? Check out [Apple's Safari Extension documentation](https://developer.apple.com/safari/extensions/) to learn more.

## Getting Started

1. Install the plugin

```console
npx expo install react-native-safari-extension
```

2. Configure the plugin in your `app.json`. Specify a `folderName` for where your extension files will live.

```json
{
  "expo": {
    "name": "myApp",
    "plugins": [
      ["react-native-safari-extension", { "folderName": "MyExtension" }]
    ]
  }
}
```

3. Add your extension files to a folder with the name provided above (this folder should be in the root of your project). You can use one of the examples in the `_extensions` directory as a reference.

```console

├── app.json
├── MyExtension # <-- the folder name you provided in the plugin config
│   ├── Resources/
│   └── Info.plist
│   └── SafariExtensionHandler.swift
├── node_modules/
├── package.json
└── ...
```

> **Note** The folder name must match the name you provided in the plugin config. All of your scripts and resources must live in a folder with the name `Resources`.

4. If you are using an Expo managed workflow, run a build using EAS. Before it builds, it will run the prebuild step, which triggers the plugin and any others you have specified. If you are using a bare workflow, run `npx expo prebuild -p ios` to run the plugin manually, then run `npx expo run:ios`.

5. Once the app has successfully run, open the Safari app, navigate to any webpage, and press the `AA` button in the address bar. This will open a context menu. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below Manage Extensions. Click on your extension to open it.

> **Note** You can also manage your extensions from the Settings app: _Settings > Safari > Extensions_

## Acknowledgements

This was heavily inspired by [Benedikt](https://twitter.com/bndkt)'s [App Clip Conflig Plugin](https://github.com/bndkt/react-native-app-clip).

Thanks to [Evan Bacon](https://twitter.com/Baconbrix) for his helpful guidance and suggestions.

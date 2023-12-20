# Basic Workflow Setup Guide

Follow these steps to get the Basic Workflow up and running.

## Install the plugin

```console
npx expo install react-native-safari-extension
```

## Configure the plugin

Configure the plugin in your `app.json`.

- Specify a `folderName` for where your extension files will live. This folder should be in the root of your project.
- Optionally define any Swift `dependencies` that you need in your extension.

```json
{
  "expo": {
    "name": "myApp",
    "plugins": [
      [
        "react-native-safari-extension",
        {
          "folderName": "MyExtension",
          "dependencies": [{ "name": "SomeSwiftPackage", "version": "5.4.3" }]
        }
      ]
    ]
  }
}
```

### Plugin Params

```ts
{
  // Required: The name of the folder where your extension files live
  folderName: string;
  // Optional: Any Swift dependencies that you need in your extension
  dependencies?: { name: string; version?: string }[];
}
```

## Add your extension files

Add your extension files to a folder with the name provided above. This folder should be in the root of your project.

> **Important:** Your file structure must match the expected [Extension Files](./ExtensionFiles.md). It's recommended to clone this repo and copy the `MyExtension` folder from the examples to get started.

## Prebuild + build your app

If you are using EAS to build your app, run a build using eas-cli.

```console
eas build --platform ios
```

Or if you're building locally:

```console
npx expo prebuild -p ios --clean
npx expo run:ios
```

## Developing your app

Once the app has successfully run, open the Safari app, navigate to any webpage, and press the `AA` button in the address bar. This will open a context menu. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below `Manage Extensions`. Click on your extension to open it.

Whenever you make a change to your extension files, you will need to rebuild your app.

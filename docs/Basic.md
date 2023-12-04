# Basic Workflow Setup Guide

### Install the plugin

```console
npx expo install react-native-safari-extension
```

### Configure the plugin

Configure the plugin in your `app.json`. Specify a `folderName` for where your extension files will live. If you are using the Experimental workflow, also specify a `web.bundler` to use metro as your bundler.

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

### Add your extension files

Add your extension files to a folder with the name provided above (this folder should be in the root of your project). You can clone this repo and copy the `MyExtension` folder in each of the examples to get started.

For more on these files, see [Extension Files](./ExtensionFiles.md).

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

Once the app has successfully run, open the Safari app, navigate to any webpage, and press the `AA` button in the address bar. This will open a context menu. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below Manage Extensions. Click on your extension to open it.

Whenever you make a change to your extension files, you will need to rebuild your app.

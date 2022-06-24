# react-native-safari-extension

Expo Config Plugin that generates a Safari Extension for iOS apps built with Expo.

## Step 1: Installation

```console
yarn add react-native-safari-extension
```

## Step 2: Configuration

Once you have installed the package, you can configure the plugin in your `app.json`:

```json
{
  "expo": {
    "name": "test-safari-extension",
    "slug": "test-safari-extension",
    "version": "1.0.0",
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "bundleIdentifier": "com.example.myapp"
    },
    "plugins": ["react-native-safari-extension"]
  }
}
```

## Step 3: Generating the Extension

Run `expo prebuild -p ios` to generate the extension in your app. You can also run `expo run:ios` to generate the extension, as well as build/run your parent app. Once the app has successfully launched, open Safari and navigate to any webpage. Click the `aA` button in the url bar, which will open a context menu. Select `Manage Extensions` and enable your extension. You should now see your extension as an option in the context menu for usage!

## Step 4: Customizing the Extension

---
sidebar_position: 3
title: "Experimental Workflow"
---

Follow these steps to get the Experimental Workflow up and running. It's called experimental for a reason, so proceed with caution!

## Install the plugin and dependencies

```console
npx expo install react-native-safari-extension react-native-web@~0.19.6 react-dom@18.2.0
```

## Configure the plugin

Configure the plugin in your `app.json`.

- Specify a `folderName` for where your extension files will live. This folder should be in the root of your project.
- Optionally define any Swift `dependencies` that you need in your extension.
- Make sure you have `expo.web.bundler` set to `"metro"`.

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
    ],
    "web": {
      "bundler": "metro"
    }
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

Add your extension files to a folder with the name provided above This folder should be in the root of your project.

:::important
Your file structure must match the expected [Extension Files](./extension-files). It's recommended to clone this repo and copy the `MyExtension` folder from the examples to get started.
:::

## Setup Fast Refresh

Fast Refresh allows you to see your changes immediately without having to rebuild your app. To enable Fast Refresh, you'll need to patch `@expo/metro-runtime`.

1. First, install `@expo/metro-runtime` and `patch-package`:

```console
npm install @expo/metro-runtime
npm install patch-package -D
```

2. Then, add this to your `package.json`:

```json
"scripts": {
  "postinstall": "patch-package"
}
```

3. Next, open `node_modules/@expo/metro-runtime/build/HMRClient.js` and make this change:

```diff
- const client = new MetroHMRClient(`${serverScheme}://${window.location.host}/hot`);
+ const host = process.env.EXPO_PUBLIC_SAFARI_EXTENSION_HOSTNAME || "localhost"
+ const port = process.env.EXPO_PUBLIC_SAFARI_EXTENSION_PORT || "8081"
+ const client = new MetroHMRClient(`${serverScheme}://${host}:${port}/hot`);
```

> **Note:** See [Using a Physical Device](#using-a-physical-device) and [Using a Custom Port](#using-a-custom-port) for more info on how to customize this.

4. Next, patch the package with:

```console
npx patch-package @expo/metro-runtime
npm install
```

5. If you're using Expo Router, skip this step. If you're not using Expo Router, import `@expo/metro-runtime` in your `App.tsx` file as early as possible:

```tsx
import "@expo/metro-runtime";
```

6. Lastly, in the in your extension's `/src/popup.html` file, ensure that the development script tag is pointing to your development server and is uncommented.

```html
<!-- Using Expo Router? Use this: -->
<script
  nonce="e60ed1dc-fe33-11ec-b939-0242ac120002"
  src="http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&lazy=true&resolver.environment=client&transform.environment=client"
></script>

<!-- Not using Expo Router? Use this: -->
<script
  nonce="e60ed1dc-fe33-11ec-b939-0242ac120002"
  src="http://localhost:8081/node_modules/expo/AppEntry.bundle?platform=web&dev=true&hot=false&lazy=true"
></script>
```

> **Note:** If you're using a phsyical device, make sure to update the `src` to point to your computer's IP address instead of `localhost`. Make sure to also update the port if you're using a port other than `8081`.

## Prebuild + build your app

If you are using EAS to build your app, run a build using eas-cli.

```console
eas build --platform ios
```

Or if you're building locally:

```console
npx expo prebuild -p ios
npx expo run:ios
```

Now you're ready to view your extension! Once the app has successfully run, open the Safari app, navigate to any webpage, and press the `AA` button in the address bar. This will open a context menu. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below `Manage Extensions`. Click on your extension to open it.

## Setup for production

Before publishing your app, there are a few things you'll need to do:

1. Create a static web build for your app: `npx expo export --platform web`
2. Copy the generated `dist` folder and paste it into your extension's `src` folder.
3. In your extension's `popup.html` file, uncomment the production script tag and comment out the development script tag. Update the `src` to point to your bundle file generated in step 2.
4. Re-build your app

```html
<script
  nonce="e60ed1dc-fe33-11ec-b939-0242ac120002"
  src="./dist/bundles/web-7798f744523ecf58d38a12b9d376308f.js"
  defer
></script>
```

## Assets

To load local assets in your extension, you'll need to create an `assets/assets/` folder in the root of your extension files. The reason for the terrible folder structure is because in expo web apps, local assets are found at `http://localhost:8081/assets/assets/image.png`, so we need to mimic that in our extension.

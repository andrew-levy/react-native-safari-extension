# Experimental Workflow Setup Guide

## Install the plugin and dependencies

```console
npx expo install react-native-safari-extension react-native-web@~0.19.6 react-dom@18.2.0
```

## Configure the plugin

Configure the plugin in your `app.json`. Specify a `folderName` for where your extension files will live. Also, make sure you have `expo.web.bundler` set to `"metro"`.

```json
{
  "expo": {
    "name": "myApp",
    "plugins": [
      ["react-native-safari-extension", { "folderName": "MyExtension" }]
    ],
    "web": {
      "bundler": "metro"
    }
  }
}
```

## Add your extension files

Add your extension files to a folder with the name provided above (this folder should be in the root of your project). You can clone this repo and copy the `MyExtension` folder in each of the examples to get started.

For more on these files, see [Extension Files](./ExtensionFiles.md).

## Setup Hot Reloading

Hot reloading allows you to see your changes immediately without having to rebuild your app. To enable hot reloading, you'll need to patch `@expo/metro-runtime`.

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
+ const port = process.env.EXPO_PUBLIC_SAFARI_EXTENSION_PORT || "8081"
+ const client = new MetroHMRClient(`${serverScheme}://localhost:${port}/hot`);
```

4. Next, patch the package with:

```console
npx patch-package @expo/metro-runtime
npm install
```

5. If you're not using Expo Router, import `@expo/metro-runtime` in your `App.tsx` file as early as possible (Expo Router apps should do this for you automatically):

```tsx
import "@expo/metro-runtime";
```

6. Lastly, in the `{ExtensionName}/src/popup.html` file, you'll see two script tags, one for development and one for production. When you're developing your extension, make sure the development script tag is uncommented and the production script tag is commented out.

```html
<!-- Expo Router script tag -->
<script
  nonce="e60ed1dc-fe33-11ec-b939-0242ac120002"
  src="http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&lazy=true&resolver.environment=client&transform.environment=client"
></script>

<!-- Non-Expo Router script tag -->
<script
  nonce="e60ed1dc-fe33-11ec-b939-0242ac120002"
  src="http://localhost:8081/node_modules/expo/AppEntry.bundle?platform=web&dev=true&hot=false&lazy=true"
></script>
```

> **Note:** Make sure the port matches where your development server is running.

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

## API

### `isSafariExtension`

Returns if the app is running in a Safari Extension. Use this to conditionally render components that should only be rendered in the extension.

```ts
function isSafariExtension(): boolean;
```

Example:

```tsx
import { isSafariExtension } from "react-native-safari-extension";

function App() {
  if (isSafariExtension()) {
    return <Extension />;
  }
  return <App />;
}
```

## Trouble Shooting

### Debugging

- You can view your extension's settings in the iOS Settings app: _Settings > Safari > Extensions_
- If you want to debug your extension, you can use Safari's Web Inspector. To enable this, open Safari, go to _Safari > Preferences > Advanced_ and check the box next to _Show Develop menu in menu bar_. Then, in the Safari menu bar, go to _Develop > Your Device Name > popup.html_.

### Development Server Port

The default port for the development server is `8081`. If you are using a different port, you can specify the `EXPO_PUBLIC_SAFARI_EXTENSION_PORT` environment variable to use a different port.

Add this to your `.env` file:

```
EXPO_PUBLIC_SAFARI_EXTENSION_PORT=8082
```

## Limitations

- Can't use `@expo/vector-icons`

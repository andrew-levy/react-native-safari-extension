
# Experimental Workflow Setup Guide

### Install the plugin

```console
npx expo install react-native-safari-extension
```

### Install dependencies

```console
npx expo install react-native-web@~0.19.6 react-dom@18.2.0
```

### Configure the plugin

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

### Add your extension files

Add your extension files to a folder with the name provided above (this folder should be in the root of your project). You can download this [sample extension](./MyExtension.zip) to get started. Your project structure should look like this:

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
npx expo prebuild -p ios
npx expo run:ios
```

### Developing your app

Once the app has successfully run, open the Safari app, navigate to any webpage, and press the `AA` button in the address bar. This will open a context menu. Select `Manage Extensions` and enable your extension by switching the toggle on. You should now see your extension as an option in the context menu below Manage Extensions. Click on your extension to open it.

> **Note** You can view your extension's settings in the iOS Settings app: _Settings > Safari > Extensions_

### Production

Before publishing your app, there are a few things you'll need to do:

1. Create a static web build for your app: `npx expo export --platform web`
2. Copy the generated `dist` folder and paste it into your extension's `public` folder.
3. In your extension's `popup.html` file, uncomment the production script tag and comment out the development script tag. Update the `src` to point to your `index.html` file in the `dist` folder from step 2.
4. Build your app and it should just work!

### API

#### `isSafariExtension`

Returns if the app is running in a Safari Extension. Use this to conditionally render components that should only be rendered in the extension.
```ts
function isSafariExtension(): boolean
```

Example:
```tsx
import { isSafariExtension } from 'react-native-safari-extension';

function App() {
  if (isSafariExtension()) {
    return <Extension />
  }
  return <App />
}
```


### Trouble Shooting

#### Development Server Port

The default port for the development server is `8081`. If you are using a different port, you can specify the `EXPO_PUBLIC_SAFARI_EXTENSION_PORT` environment variable to use a different port.

Add this to your `.env` file:

```
EXPO_PUBLIC_SAFARI_EXTENSION_PORT=8082
```

### Limitations

- Can't use assets outside of the `public` folder.


---
sidebar_position: 7
title: "Troubleshooting"
---

### Expo Router

When you load the first screen in your extension, you may see an Unmatched Route error. In this case, redirect to the correct screen within a custom unmatched route screen.

### Debugging

You can view your extension's settings in the iOS Settings app: _Settings > Safari > Extensions_. If you want to debug your extension, you can use Safari's Web Inspector. To enable this, open Safari, go to _Safari > Preferences > Advanced_ and check the box next to _Show Develop menu in menu bar_. Then, in the Safari menu bar, go to _Develop > Your Device Name > popup.html_.

### Using a physical device

When developing on a physical device, you'll need to set the `EXPO_PUBLIC_SAFARI_EXTENSION_HOSTNAME` environment variable to your computer's IP address. `EXPO_PUBLIC_SAFARI_EXTENSION_HOSTNAME` defaults to `localhost`, which won't work on a physical device.

```
EXPO_PUBLIC_SAFARI_EXTENSION_HOSTNAME=10.50.131.40
EXPO_PUBLIC_SAFARI_EXTENSION_PORT=8081
```

> **Note:** If you're building with EAS, set these env variables in your `eas.json` as well. See more [here](https://docs.expo.dev/build-reference/variables/).

### Using a Custom Port

The default port for the development server is `8081`. If you are using a different port, you can specify the `EXPO_PUBLIC_SAFARI_EXTENSION_PORT` environment variable to use a different port.

Add this to your `.env` file:

```
EXPO_PUBLIC_SAFARI_EXTENSION_PORT=8082
```

> **Note:** If you're building with EAS, set this env variables in your `eas.json` as well. See more [here](https://docs.expo.dev/build-reference/variables/).

### Limitations

Can't use `@expo/vector-icons`

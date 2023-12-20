# Extension Files

When using this plugin, you get to manage your extension files outside of the `ios` folder. Here's a breakdown of the necessary files:

```console
MyApp/
├── app/
├── app.json
├── MyExtension/ # <-- the folder name you provided in the config
│   ├── src/
│   ├── assets/
│   ├── Info.plist
|   ├── manifest.json
│   └── SafariExtensionHandler.swift
├── node_modules/
├── package.json
└── ...
```

### `src/`

This folder contains all of your extension resource files. You can add, remove or modify any of these files to customize your extension. These files are linked closely to the `manifest.json` file, where many of the resources are referenced. **Its very important that you don't change the name of this folder. This folder is required.**

### `assets/`

This folder contains all of your extension assets. If you want to use local assets that your app is using, copy your app's `assets` folder and paste it into here. So the end result should be `assets/assets/...`. Not ideal, I know, but it's necessary. **Its very important that you don't change the name of this folder. This folder is required.**

### `manifest.json`

This file contains further configuration for your extension including the name, description, content scripts, entry point, permissions, etc. **This file is required.**

### `Info.plist`

This file contains the configuration for your extension. **If not included, this file will be generated for you during the prebuild step.**

### `SafariExtensionHandler.swift`

This file contains the native code required to run your extension. You likely won't need to modify this file. **If not included, this file will be generated for you during the prebuild step.**

### `{ExtensionName}.entitlements`

This file contains the entitlements for your extension. This plugin sets up the App Groups entitlement by default so that you can message between the app and the extension. **If not included, this file will be generated for you during the prebuild step.**

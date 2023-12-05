# Extension Files

When using this plugin, you get to manage your extension files outside of the `ios` folder. Here's a breakdown of the necessary files:

```console
MyApp/
├── app/
├── app.json
├── MyExtension/ # <-- the folder name you provided in the config
│   ├── src/
│   └── Info.plist
|   └── manifest.json
│   └── SafariExtensionHandler.swift
├── node_modules/
├── package.json
└── ...
```

### `src/`

This folder contains all of your extension resource files. You can add, remove or modify any of these files to customize your extension. These files are linked closely to the `manifest.json` file, where many of the resources are referenced. **Its very important that you don't change the name of this folder.**

### `Info.plist`

This file contains the configuration for your extension. You likely won't need to modify this file, but it is required.

### `manifest.json`

This file contains further configuration for your extension including the name, description, content scripts, entry point, permissions, etc.

### `SafariExtensionHandler.swift`

This file contains the native code required to run your extension. You likely won't need to modify this file, but it is required.

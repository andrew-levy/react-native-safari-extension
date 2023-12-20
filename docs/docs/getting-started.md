---
slug: /
sidebar_position: 1
title: "Getting Started"
---

# React Native Safari Extension

## What is it?

An [Expo Config Plugin](https://docs.expo.dev/config-plugins/introduction/) that allows you to add a Safari Extension to your iOS apps. This plugin allows you to manage your extension
without having to open Xcode.

:::info Note
Not sure what Safari Extensions are? Check out [Apple's Safari Extension documentation](https://developer.apple.com/safari/extensions/) to learn more.
:::

## Choose a workflow

There are two workflows for using this plugin:

### 💯 [Basic Workflow](./basic.md)

Build your own extension using HTML, CSS, and vanilla JavaScript.

### 🚀 [Experimental Workflow](./experimental.md)

Render React Native web inside of your extension. This uses Expo web and Metro to output your React Native compononents inside of the extension popup. You can use Fast Refresh to see your changes in real time.

### Which workflow should I use?

If you are building a simple extension, the Basic Workflow is probably the best option. If it's more complex, you may want to use the Experimental Workflow (it's also more fun).

| Feature / Workflow             | Experimental Workflow | Basic Workflow |
| ------------------------------ | --------------------- | -------------- |
| Manage files outside of `ios/` | ✅                    | ✅             |
| Expo Prebuild                  | ✅                    | ✅             |
| Fast Refresh                   | ✅                    |                |
| Expo Web                       | ✅                    |                |

## Support

If you find this plugin useful, consider buying me a coffee! ☕️

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/hugemathguy)

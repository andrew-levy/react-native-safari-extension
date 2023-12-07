[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/hugemathguy)

# react-native-safari-extension

> **Warning** This plugin is a work in progress so there may be some bugs. Please feel free to contribute by reporting any issues or opening a PR.

## What is it?

An [Expo Config Plugin](https://docs.expo.dev/guides/config-plugins/) that allows you to add a Safari Extension to your iOS apps. This plugin allows you to manage your extension files outside of the `ios` directory with the help of Expo Prebuild. It will continuously generate your native project with your extension files included.

> **Note** Not sure what Safari Extensions are? Check out [Apple's Safari Extension documentation](https://developer.apple.com/safari/extensions/) to learn more.

## Workflows

There are two workflows for using this plugin:

### 🚀 Experimental Workflow

Render React Native web inside of your extension. This uses Expo web and Metro to output your React Native compononents inside of the extension popup. You can use Fast Refresh to see your changes in real time.

### 💯 Basic Workflow

Build your own extension using HTML, CSS, and vanilla JavaScript.

### Which workflow should I use?

If you are building a simple extension, the Basic Workflow is probably the best option. If it's more complex, you may want to use the Experimental Workflow (it's also more fun).

| Feature / Workflow             | Experimental Workflow | Basic Workflow |
| ------------------------------ | --------------------- | -------------- |
| Manage files outside of `ios/` | ✅                    | ✅             |
| Expo Prebuild                  | ✅                    | ✅             |
| Fast Refresh                   | ✅                    |                |
| Expo Web                       | ✅                    |                |

## Getting Started

- [Experimental Workflow Setup Guide](./docs/Experimental.md)

- [Basic Workflow Setup Guide](./docs/Basic.md)

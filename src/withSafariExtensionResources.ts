import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";

import { getExtensionFolder } from "./withSafariExtension";

export const withSafariExtensionResources: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const extensionFolderName = getExtensionFolder(
        config.modRequest.projectName!
      );
      const extensionRootPath = path.join(
        config.modRequest.platformProjectRoot,
        extensionFolderName
      );

      const extensionResourcesOut = path.join(extensionRootPath, "Resources");

      // Automate this
      const backgroundJS = path.join(__dirname, "Resources/background.js");
      const contentJS = path.join(__dirname, "Resources/content.js");
      const popupJS = path.join(__dirname, "Resources/popup.js");
      const manifestJSON = path.join(__dirname, "Resources/manifest.json");
      const popupCSS = path.join(__dirname, "Resources/popup.css");
      const popupHTML = path.join(__dirname, "Resources/popup.html");
      const messagesJSON = path.join(
        __dirname,
        "Resources",
        "_locales",
        "en",
        "messages.json"
      );

      await fs.promises.mkdir(extensionResourcesOut, { recursive: true });
      await fs.promises.mkdir(
        path.join(extensionResourcesOut, "_locales", "en"),
        {
          recursive: true,
        }
      );
      await fs.promises.mkdir(path.join(extensionResourcesOut, "images"), {
        recursive: true,
      });

      await fs.promises.copyFile(
        backgroundJS,
        path.join(extensionResourcesOut, "background.js")
      );
      await fs.promises.copyFile(
        contentJS,
        path.join(extensionResourcesOut, "content.js")
      );
      await fs.promises.copyFile(
        popupJS,
        path.join(extensionResourcesOut, "popup.js")
      );
      await fs.promises.copyFile(
        manifestJSON,
        path.join(extensionResourcesOut, "manifest.json")
      );
      await fs.promises.copyFile(
        popupCSS,
        path.join(extensionResourcesOut, "popup.css")
      );
      await fs.promises.copyFile(
        popupHTML,
        path.join(extensionResourcesOut, "popup.html")
      );
      await fs.promises.copyFile(
        messagesJSON,
        path.join(extensionResourcesOut, "_locales/en/messages.json")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "icon-48.png"),
        path.join(extensionResourcesOut, "images/icon-48.png")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "icon-64.png"),
        path.join(extensionResourcesOut, "images/icon-64.png")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "icon-128.png"),
        path.join(extensionResourcesOut, "images/icon-128.png")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "icon-256.png"),
        path.join(extensionResourcesOut, "images/icon-256.png")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "icon-512.png"),
        path.join(extensionResourcesOut, "images/icon-512.png")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "toolbar-icon-16.png"),
        path.join(extensionResourcesOut, "images/toolbar-icon-16.png")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "toolbar-icon-19.png"),
        path.join(extensionResourcesOut, "images/toolbar-icon-19.png")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "toolbar-icon-32.png"),
        path.join(extensionResourcesOut, "images/toolbar-icon-32.png")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "toolbar-icon-38.png"),
        path.join(extensionResourcesOut, "images/toolbar-icon-38.png")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "toolbar-icon-48.png"),
        path.join(extensionResourcesOut, "images/toolbar-icon-48.png")
      );
      await fs.promises.copyFile(
        path.join(__dirname, "Resources", "images", "toolbar-icon-72.png"),
        path.join(extensionResourcesOut, "images/toolbar-icon-72.png")
      );

      return config;
    },
  ]);
};

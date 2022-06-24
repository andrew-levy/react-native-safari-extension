import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";
import { getExtensionFolder } from "./withSafariExtension";

export const withSafariExtensionHandler: ConfigPlugin = (config) => {
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

      const safariWebExtensionHandlerPath = path.join(
        __dirname,
        "SafariWebExtensionHandler",
        "SafariWebExtensionHandler.m"
      );

      const safariWebExtensionHandlerHeaderPath = path.join(
        __dirname,
        "SafariWebExtensionHandler",
        "SafariWebExtensionHandler.h"
      );

      await fs.promises.copyFile(
        safariWebExtensionHandlerPath,
        path.join(extensionRootPath, "SafariWebExtensionHandler.m")
      );
      await fs.promises.copyFile(
        safariWebExtensionHandlerHeaderPath,
        path.join(extensionRootPath, "SafariWebExtensionHandler.h")
      );
      return config;
    },
  ]);
};

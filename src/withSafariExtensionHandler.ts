import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";
import { getExtensionIosFolderName } from "./utils";

export const withSafariExtensionHandler: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const extensionRootPath = path.join(
        config.modRequest.platformProjectRoot,
        getExtensionIosFolderName(config.modRequest.projectName!)
      );
      await fs.promises.copyFile(
        path.join(__dirname, "SafariWebExtensionHandler.swift"),
        path.join(extensionRootPath, "SafariWebExtensionHandler.swift")
      );
      return config;
    },
  ]);
};

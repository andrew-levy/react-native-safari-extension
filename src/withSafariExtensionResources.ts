import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";
import { copyFolderRecursive, WEB_EXTENSION } from "./utils";

export const withSafariExtensionResources: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const extensionRootPath = path.join(
        config.modRequest.platformProjectRoot,
        WEB_EXTENSION
      );
      const projectRootPath = path.join(extensionRootPath, "../..");
      const destAlreadyExists = fs.existsSync(
        path.join(projectRootPath, WEB_EXTENSION)
      );

      if (!destAlreadyExists) {
        await copyFolderRecursive(
          path.join(__dirname, "static", WEB_EXTENSION),
          path.join(projectRootPath, WEB_EXTENSION)
        );
      }

      await fs.promises.copyFile(
        path.join(__dirname, "static/webpack.config.js"),
        path.join(projectRootPath, "webpack.config.js")
      );

      return config;
    },
  ]);
};

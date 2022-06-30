import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";

import { getExtensionFolder } from "./utils";

type SafariExtensionConfigOptions = {
  dir?: string;
};

export const withSafariExtensionResources: ConfigPlugin<
  SafariExtensionConfigOptions
> = (config, options) => {
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
      const projectRootPath = path.join(extensionRootPath, "../..");
      const destAlreadyExists = fs.existsSync(
        path.join(projectRootPath, "web-extension")
      );

      // Copy the web-extension folder to the project root if it doesn't exist
      if (!destAlreadyExists) {
        await copyFolderRecursive(
          path.join(__dirname, "web-extension"),
          path.join(projectRootPath, "web-extension")
        );
      }

      return config;
    },
  ]);
};

async function copyFolderRecursive(src: string, dest: string) {
  await fs.promises.mkdir(dest, { recursive: true });
  const files = await fs.promises.readdir(src);
  for (const file of files) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stats = await fs.promises.stat(srcFile);
    if (stats.isFile()) {
      await fs.promises.copyFile(srcFile, destFile);
    } else if (stats.isDirectory()) {
      await copyFolderRecursive(srcFile, destFile);
    }
  }
}

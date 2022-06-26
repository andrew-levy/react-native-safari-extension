import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";

import { getExtensionFolder } from "./withSafariExtension";

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
      const extensionResourcesOut = path.join(extensionRootPath, "Resources");
      const projectFilesDest =
        options?.dir ?? path.join(projectRootPath, `${extensionFolderName}`);
      const destAlreadyExists = fs.existsSync(projectFilesDest);

      if (!destAlreadyExists) {
        await copyFolderRecursive(
          path.join(__dirname, "Resources"),
          projectFilesDest
        );
        const manifestContent = await fs.promises.readFile(
          path.join(projectFilesDest, "manifest.json")
        );
        const manifestJSON = JSON.parse(manifestContent.toString());
        manifestJSON.name = extensionFolderName;
        await fs.promises.writeFile(
          path.join(projectFilesDest, "manifest.json"),
          JSON.stringify(manifestJSON, null, 2)
        );
      }

      // Copy either the default or the specified directory to `ios/{extensionName}/Resources/`.
      await copyFolderRecursive(
        options?.dir
          ? path.join(projectRootPath, options.dir)
          : path.join(__dirname, "Resources"),
        extensionResourcesOut
      );

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

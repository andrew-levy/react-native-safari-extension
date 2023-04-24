import {
  ConfigPlugin,
  InfoPlist,
  withDangerousMod,
} from "@expo/config-plugins";
import plist from "@expo/plist";
import * as fs from "fs";
import * as path from "path";
import { copyFolderRecursive } from "./utils";

export const withSafariExtensionPlist: ConfigPlugin<{ folderName: string }> = (
  config,
  { folderName }
) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const extensionRootPath = path.join(
        config.modRequest.projectRoot,
        folderName
      );
      const extensionFilePath = path.join(extensionRootPath, "Info.plist");

      const extensionPlist: InfoPlist = {
        NSExtension: {
          NSExtensionPointIdentifier: "com.apple.Safari.web-extension",
          NSExtensionPrincipalClass: "SafariWebExtensionHandler",
        },
      };

      extensionPlist.CFBundleName = "$(PRODUCT_NAME)";
      extensionPlist.CFBundleDisplayName = "Extension";
      extensionPlist.CFBundleIdentifier = "$(PRODUCT_BUNDLE_IDENTIFIER)";
      extensionPlist.CFBundleVersion = "$(CURRENT_PROJECT_VERSION)";
      extensionPlist.CFBundleExecutable = "$(EXECUTABLE_NAME)";
      extensionPlist.CFBundlePackageType = "$(PRODUCT_BUNDLE_PACKAGE_TYPE)";
      extensionPlist.CFBundleShortVersionString = "$(MARKETING_VERSION)";

      await fs.promises.mkdir(path.dirname(extensionFilePath), {
        recursive: true,
      });

      await fs.promises.writeFile(
        extensionFilePath,
        plist.build(extensionPlist)
      );

      await copyFolderRecursive(
        path.join(path.resolve(config.modRequest.projectRoot), folderName),
        path.join(
          path.resolve(config.modRequest.platformProjectRoot),
          folderName
        )
      );

      return config;
    },
  ]);
};

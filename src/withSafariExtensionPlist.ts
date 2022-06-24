import {
  ConfigPlugin,
  InfoPlist,
  withDangerousMod,
} from "@expo/config-plugins";
import plist from "@expo/plist";
import * as fs from "fs";
import * as path from "path";

import { getExtensionFolder } from "./withSafariExtension";

export const withSafariExtensionPlist: ConfigPlugin = (config) => {
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
      const extensionFilePath = path.join(extensionRootPath, "Info.plist");

      const extensionPlist: InfoPlist = {
        NSExtension: {
          NSExtensionPointIdentifier: "com.apple.Safari.web-extension",
          NSExtensionPrincipalClass: "SafariWebExtensionHandler",
        },
      };

      extensionPlist.CFBundleName = "$(PRODUCT_NAME)";
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

      return config;
    },
  ]);
};

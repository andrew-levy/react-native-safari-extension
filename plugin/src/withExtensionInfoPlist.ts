import { ConfigPlugin, InfoPlist, withInfoPlist } from "@expo/config-plugins";
import plist from "@expo/plist";
import * as fs from "fs";
import * as path from "path";

export const withExtensionInfoPlist: ConfigPlugin<{ folderName: string }> = (
  config,
  { folderName }
) => {
  return withInfoPlist(config, async (config) => {
    const extensionRootPath = path.join(
      config.modRequest.projectRoot,
      folderName
    );
    const infoPlistExists = fs.existsSync(
      path.join(extensionRootPath, "Info.plist")
    );

    if (infoPlistExists) return config;

    const extensionFilePath = path.join(extensionRootPath, "Info.plist");

    const extensionPlist: InfoPlist = {
      NSExtension: {
        NSExtensionPointIdentifier: "com.apple.Safari.web-extension",
        NSExtensionPrincipalClass:
          "$(PRODUCT_MODULE_NAME).SafariWebExtensionHandler",
      },
    };

    extensionPlist.CFBundleName = "$(PRODUCT_NAME)";
    extensionPlist.CFBundleDisplayName = "Extension";
    extensionPlist.CFBundleIdentifier = "$(PRODUCT_BUNDLE_IDENTIFIER)";
    extensionPlist.CFBundleVersion = "$(CURRENT_PROJECT_VERSION)";
    extensionPlist.CFBundleExecutable = "$(EXECUTABLE_NAME)";
    extensionPlist.CFBundlePackageType = "$(PRODUCT_BUNDLE_PACKAGE_TYPE)";
    extensionPlist.CFBundleShortVersionString = "$(MARKETING_VERSION)";

    fs.mkdirSync(path.dirname(extensionFilePath), {
      recursive: true,
    });

    fs.writeFileSync(extensionFilePath, plist.build(extensionPlist));

    return config;
  });
};

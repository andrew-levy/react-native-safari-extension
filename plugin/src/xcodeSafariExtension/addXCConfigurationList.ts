import { XcodeProject } from "@expo/config-plugins";

import { quoted } from "../utils";

export default function (
  proj: XcodeProject,
  {
    extensionBundleIdentifier,
    currentProjectVersion,
    marketingVersion,
    extensionName,
  }: {
    extensionBundleIdentifier: string;
    currentProjectVersion: string;
    marketingVersion: string;
    extensionName: string;
  }
) {
  const commonBuildSettings: any = {
    ASSETCATALOG_COMPILER_APPICON_NAME: "AppIcon",
    CLANG_ENABLE_MODULES: "YES",
    CODE_SIGN_ENTITLEMENTS: `../${extensionName}/${extensionName}.entitlements`,
    CURRENT_PROJECT_VERSION: quoted(currentProjectVersion),
    INFOPLIST_FILE: `../${extensionName}/Info.plist`,
    MARKETING_VERSION: quoted(marketingVersion),
    PRODUCT_BUNDLE_IDENTIFIER: extensionBundleIdentifier,
    PRODUCT_NAME: quoted(extensionName),
    TARGETED_DEVICE_FAMILY: quoted("1,2"),
    SWIFT_VERSION: "5.0",
    IPHONEOS_DEPLOYMENT_TARGET: "15.0",
    VERSIONING_SYSTEM: "apple-generic",
  };

  const buildConfigurationsList = [
    {
      name: "Debug",
      isa: "XCBuildConfiguration",
      buildSettings: {
        ...commonBuildSettings,
      },
    },
    {
      name: "Release",
      isa: "XCBuildConfiguration",
      buildSettings: {
        ...commonBuildSettings,
      },
    },
  ];

  const xCConfigurationList = proj.addXCConfigurationList(
    buildConfigurationsList,
    "Release",
    `Build configuration list for PBXNativeTarget ${quoted(extensionName)} `
  );

  return xCConfigurationList;
}

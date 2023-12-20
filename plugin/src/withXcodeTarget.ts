import { ConfigPlugin, withXcodeProject } from "@expo/config-plugins";
import { addSafariExtensionXcodeTarget } from "./xcodeSafariExtension/xcodeSafariExtension";

export const withXcodeTarget: ConfigPlugin<{
  folderName: string;
}> = (config, { folderName }) => {
  return withXcodeProject(config, (config) => {
    addSafariExtensionXcodeTarget(config.modResults, {
      extensionName: folderName,
      extensionBundleIdentifier: `${config.ios?.bundleIdentifier}.${folderName}`,
      currentProjectVersion: config.ios?.buildNumber || "1",
      marketingVersion: config.version || "1.0.0",
      iosRoot: config.modRequest.platformProjectRoot,
    });

    return config;
  });
};

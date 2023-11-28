import { ConfigPlugin, withXcodeProject } from "@expo/config-plugins";
import { addSafariExtensionXcodeTarget } from "./xcodeSafariExtension/xcodeSafariExtension";

export const withXcodeTarget: ConfigPlugin<{
  folderName: string;
}> = (config, { folderName }) => {
  return withXcodeProject(config, (config) => {
    addSafariExtensionXcodeTarget(config.modResults, {
      appName: config.modRequest.projectName!,
      extensionName: folderName,
      extensionBundleIdentifier: `${config.ios!
        .bundleIdentifier!}.${folderName}`,
      currentProjectVersion: config.ios!.buildNumber || "1",
      marketingVersion: config.version!,
      iosRoot: config.modRequest.platformProjectRoot,
    });

    return config;
  });
};

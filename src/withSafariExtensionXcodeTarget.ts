import { ConfigPlugin, withXcodeProject } from "@expo/config-plugins";
import {
  getExtensionBundleIdentifier,
  getExtensionIosFolderName,
} from "./utils";
import { addSafariExtensionXcodeTarget } from "./xcodeSafariExtension/xcodeSafariExtension";

export const withSafariExtensionXcodeTarget: ConfigPlugin = (config) => {
  return withXcodeProject(config, (config) => {
    const appName = config.modRequest.projectName!;
    const extensionName = getExtensionIosFolderName(
      config.modRequest.projectName!
    );
    const extensionBundleIdentifier = getExtensionBundleIdentifier(
      config.ios!.bundleIdentifier!
    );
    const currentProjectVersion = config.ios!.buildNumber || "1";
    const marketingVersion = config.version!;

    addSafariExtensionXcodeTarget(config.modResults, {
      appName,
      extensionName,
      extensionBundleIdentifier,
      currentProjectVersion,
      marketingVersion,
    });

    return config;
  });
};

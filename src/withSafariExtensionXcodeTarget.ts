import { ConfigPlugin, withXcodeProject } from "@expo/config-plugins";
import * as path from "path";

import {
  getExtensionBundleIdentifier,
  getExtensionFolder,
  getExtensionName,
} from "./withSafariExtension";
import { addSafariExtensionXcodeTarget } from "./xcodeSafariExtension/xcodeSafariExtension";

export const withSafariExtensionXcodeTarget: ConfigPlugin = (config) => {
  return withXcodeProject(config, (config) => {
    const appName = config.modRequest.projectName!;
    const extensionName = getExtensionName(config.modRequest.projectName!);
    const extensionFolder = getExtensionFolder(config.modRequest.projectName!);
    const extensionBundleIdentifier = getExtensionBundleIdentifier(
      config.ios!.bundleIdentifier!
    );
    const extensionRootPath = path.join(
      config.modRequest.platformProjectRoot,
      extensionFolder
    );
    const platformProjectRoot = config.modRequest.platformProjectRoot;
    const currentProjectVersion = config.ios!.buildNumber || "1";
    const marketingVersion = config.version!;

    addSafariExtensionXcodeTarget(config.modResults, {
      appName,
      extensionName,
      extensionFolder,
      extensionBundleIdentifier,
      extensionRootPath,
      platformProjectRoot,
      currentProjectVersion,
      marketingVersion,
      entryPoint: "",
    });

    return config;
  });
};

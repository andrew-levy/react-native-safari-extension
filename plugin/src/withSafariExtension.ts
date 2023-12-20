import { ConfigPlugin, withPlugins } from "@expo/config-plugins";
import { withAppEntitlements } from "./withAppEntitlements";
import { withExtensionConfig } from "./withExtensionConfig";
import { withExtensionEntitlements } from "./withExtensionEntitlements";
import { withExtensionInfoPlist } from "./withExtensionInfoPlist";
import { withPodfile } from "./withPodfile";
import { withSafariWebExtensionHandler } from "./withSafariWebExtensionHandler";
import { withXcodeTarget } from "./withXcodeTarget";

type PluginParams = {
  folderName: string;
  dependencies?: Record<string, string>[];
};

const withSafariExtension: ConfigPlugin<PluginParams> = (
  config,
  { folderName, dependencies }
) => {
  return withPlugins(config, [
    withAppEntitlements,
    [withExtensionEntitlements, { folderName }],
    [withExtensionInfoPlist, { folderName }],
    [withSafariWebExtensionHandler, { folderName }],
    [withPodfile, { folderName, dependencies }],
    [withExtensionConfig, { folderName }],
    [withXcodeTarget, { folderName }],
  ]);
};

export default withSafariExtension;

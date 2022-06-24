import { ConfigPlugin } from "@expo/config-plugins";

import { withSafariExtensionAppConfig } from "./withSafariExtensionAppConfig";
import { withSafariExtensionHandler } from "./withSafariExtensionHandler";
import { withSafariExtensionPlist } from "./withSafariExtensionPlist";
import { withSafariExtensionXcodeTarget } from "./withSafariExtensionXcodeTarget";
import { withSafariExtensionResources } from "./withSafariExtensionResources";

const withSafariExtension: ConfigPlugin = (config) => {
  config = withSafariExtensionAppConfig(config);
  config = withSafariExtensionHandler(config);
  config = withSafariExtensionResources(config);
  config = withSafariExtensionPlist(config);
  config = withSafariExtensionXcodeTarget(config);

  return config;
};

export default withSafariExtension;

export function getExtensionName(projectName: string) {
  return `${projectName} Extension`;
}

export function getExtensionFolder(projectName: string) {
  return `${projectName}Extension`;
}

export function getExtensionBundleIdentifier(bundleIdentifier: string) {
  return `${bundleIdentifier}.Extension`;
}

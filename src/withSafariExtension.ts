import { ConfigPlugin } from "@expo/config-plugins";

import { withSafariExtensionHandler } from "./withSafariExtensionHandler";
import { withSafariExtensionPlist } from "./withSafariExtensionPlist";
import { withSafariExtensionXcodeTarget } from "./withSafariExtensionXcodeTarget";
import { withSafariExtensionResources } from "./withSafariExtensionResources";

const withSafariExtension: ConfigPlugin = (config) => {
  config = withSafariExtensionHandler(config);
  config = withSafariExtensionResources(config);
  config = withSafariExtensionPlist(config);
  config = withSafariExtensionXcodeTarget(config);
  return config;
};

export default withSafariExtension;

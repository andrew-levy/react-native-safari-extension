import { ConfigPlugin } from "@expo/config-plugins";

import { withSafariExtensionHandler } from "./withSafariExtensionHandler";
import { withSafariExtensionPlist } from "./withSafariExtensionPlist";
import { withSafariExtensionXcodeTarget } from "./withSafariExtensionXcodeTarget";
import { withSafariExtensionResources } from "./withSafariExtensionResources";

type SafariExtensionConfigOptions = {
  dir?: string;
};

const withSafariExtension: ConfigPlugin<SafariExtensionConfigOptions> = (
  config,
  options
) => {
  config = withSafariExtensionHandler(config);
  config = withSafariExtensionResources(config, options);
  config = withSafariExtensionPlist(config);
  config = withSafariExtensionXcodeTarget(config);

  return config;
};

export default withSafariExtension;

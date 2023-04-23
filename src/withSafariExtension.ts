import { ConfigPlugin } from "@expo/config-plugins";
import { withSafariExtensionPlist } from "./withSafariExtensionPlist";
import { withSafariExtensionXcodeTarget } from "./withSafariExtensionXcodeTarget";

const withSafariExtension: ConfigPlugin<{ folderName: string }> = (
  config,
  { folderName }
) => {
  config = withSafariExtensionPlist(config, { folderName });
  config = withSafariExtensionXcodeTarget(config, { folderName });
  return config;
};

export default withSafariExtension;

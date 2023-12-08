import { ConfigPlugin } from "@expo/config-plugins";
import { withExtensionConfig } from "./withExtensionConfig";
import { withRemoveApsEntitlement } from "./withRemoveApsEntitlement";
import { withXcodeTarget } from "./withXcodeTarget";

const withSafariExtension: ConfigPlugin<{
  folderName: string;
}> = (config, { folderName }) => {
  config = withRemoveApsEntitlement(config);
  config = withExtensionConfig(config, { folderName });
  config = withXcodeTarget(config, { folderName });

  return config;
};

export default withSafariExtension;

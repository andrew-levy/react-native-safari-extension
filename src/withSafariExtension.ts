import { ConfigPlugin } from "@expo/config-plugins";
import { withExtensionConfig } from "./withExtensionConfig";
import { withInfoPlist } from "./withInfoPlist";
import { withXcodeTarget } from "./withXcodeTarget";
import { withRemoveApsEntitlement } from "./withRemoveApsEntitlement";
// import { withPodfile } from "./withPodfile";

const withSafariExtension: ConfigPlugin<{
  folderName: string;
}> = (config, { folderName }) => {
  config = withRemoveApsEntitlement(config);
  // config = withPodfile(config, { folderName });
  config = withExtensionConfig(config, { folderName });
  config = withInfoPlist(config, { folderName });
  config = withXcodeTarget(config, { folderName });

  return config;
};

export default withSafariExtension;

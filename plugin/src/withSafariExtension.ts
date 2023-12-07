import { ConfigPlugin } from "@expo/config-plugins";
import { withExtensionConfig } from "./withExtensionConfig";
import { withXcodeTarget } from "./withXcodeTarget";

const withSafariExtension: ConfigPlugin<{
  folderName: string;
}> = (config, { folderName }) => {
  config = withExtensionConfig(config, { folderName });
  config = withXcodeTarget(config, { folderName });

  return config;
};

export default withSafariExtension;

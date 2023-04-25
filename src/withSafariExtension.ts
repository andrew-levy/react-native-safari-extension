import { ConfigPlugin } from "@expo/config-plugins";
import { withInfoPlist } from "./withInfoPlist";
import { withPodfile } from "./withPodfile";
import { withXcodeTarget } from "./withXcodeTarget";

const withSafariExtension: ConfigPlugin<{
  folderName: string;
  teamID: string;
}> = (config, { folderName, teamID }) => {
  config = withInfoPlist(config, { folderName });
  config = withPodfile(config, { teamID });
  config = withXcodeTarget(config, { folderName });

  return config;
};

export default withSafariExtension;

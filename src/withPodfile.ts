import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";
import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";

export const withPodfile: ConfigPlugin<{
  teamID: string;
}> = (config, { teamID }) => {
  return withDangerousMod(config, [
    "ios",
    (config) => {
      const podFilePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      );
      let podFileContent = fs.readFileSync(podFilePath).toString();

      podFileContent = mergeContents({
        tag: "react-native-safari-extension-1",
        src: podFileContent,
        newSrc: `
          config.build_settings['DEVELOPMENT_TEAM'] = '${teamID}'
        `,
        anchor: /config.build_settings/,
        offset: 0,
        comment: "#",
      }).contents;

      fs.writeFileSync(podFilePath, podFileContent);

      return config;
    },
  ]);
};

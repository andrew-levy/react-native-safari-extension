import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";
import * as fs from "fs";
import * as path from "path";

export const withPodfile: ConfigPlugin<{
  folderName: string;
  dependencies?: Record<string, string>[];
}> = (config, { folderName, dependencies }) => {
  return withDangerousMod(config, [
    "ios",
    (config) => {
      if (!dependencies) return config;
      const podFilePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      );
      let podfileContent = fs.readFileSync(podFilePath).toString();

      const extensionTargetContents = `target '${folderName}' do          
        ${dependencies
          ?.map(
            (dependency) =>
              `pod '${dependency.name}'${
                dependency.version ? `, '${dependency.version}'` : ""
              }`
          )
          .join("\n")}
end`;

      podfileContent = mergeContents({
        tag: "safari-extension-target",
        src: podfileContent,
        newSrc: extensionTargetContents,
        anchor: /target\s+'reactnavigationexample'/,
        offset: -1,
        comment: "#",
      }).contents;

      fs.writeFileSync(podFilePath, podfileContent);

      return config;
    },
  ]);
};

import { XcodeProject } from "@expo/config-plugins";
import path from "path";

import { PBXFile, quoted } from "../utils";

export default function addBuildPhases(
  proj: XcodeProject,
  {
    groupName,
    productFile,
    targetUuid,
    extensionRootPath,
  }: {
    groupName: string;
    productFile: PBXFile;
    targetUuid: string;
    extensionRootPath: string;
  }
) {
  const buildPath = quoted("");

  // Add shell script build phase "Start Packager"
  // const { uuid: startPackagerShellScriptBuildPhaseUuid } = proj.addBuildPhase(
  //   [],
  //   "PBXShellScriptBuildPhase",
  //   "Start Packager",
  //   targetUuid,
  //   {
  //     shellPath: "/bin/sh",
  //     shellScript: `export RCT_METRO_PORT=\"\${RCT_METRO_PORT:=8081}\"\\necho \"export RCT_METRO_PORT=\${RCT_METRO_PORT}\" > \`node --print \"require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/.packager.env'\"\`\\nif [ -z \"\${RCT_NO_LAUNCH_PACKAGER+xxx}\" ] ; then\\n  if nc -w 5 -z localhost \${RCT_METRO_PORT} ; then\\n    if ! curl -s \"http://localhost:\${RCT_METRO_PORT}/status\" | grep -q \"packager-status:running\" ; then\\n      echo \"Port \${RCT_METRO_PORT} already in use, packager is either not running or not running correctly\"\\n      exit 2\\n    fi\\n  else\\n    open \`node --print \"require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/launchPackager.command'\"\` || echo \"Can't start packager automatically\"\\n  fi\\nfi\\n`,
  //   },
  //   buildPath
  // );
  // console.log(
  //   `Added PBXShellScriptBuildPhase ${startPackagerShellScriptBuildPhaseUuid}`
  // );

  const { uuid: generateManifestScriptBuildPhaseUuid } = proj.addBuildPhase(
    [],
    "PBXShellScriptBuildPhase",
    "Generate manifest.json",
    targetUuid,
    {
      shellPath: "/bin/sh",
      shellScript: "node ../web-extension/manifest.js",
    },
    buildPath
  );
  console.log(
    `Added PBXShellScriptBuildPhase ${generateManifestScriptBuildPhaseUuid}`
  );

  // Sources build phase
  const { uuid: sourcesBuildPhaseUuid } = proj.addBuildPhase(
    [path.join(extensionRootPath, "SafariWebExtensionHandler.swift")],
    "PBXSourcesBuildPhase",
    groupName,
    targetUuid,
    "app_extension",
    buildPath
  );
  console.log(`Added PBXSourcesBuildPhase ${sourcesBuildPhaseUuid}`);

  // Copy files build phase
  const { uuid: copyFilesBuildPhaseUuid } = proj.addBuildPhase(
    [productFile.path],
    "PBXCopyFilesBuildPhase",
    groupName,
    proj.getFirstTarget().uuid,
    "app_extension",
    buildPath
  );
  console.log(`Added PBXCopyFilesBuildPhase ${copyFilesBuildPhaseUuid}`);

  // Frameworks build phase
  const { uuid: frameworksBuildPhaseUuid } = proj.addBuildPhase(
    [],
    "PBXFrameworksBuildPhase",
    groupName,
    targetUuid,
    "app_extension",
    buildPath
  );
  console.log(`Added PBXResourcesBuildPhase ${frameworksBuildPhaseUuid}`);

  // Resources build phase
  const { uuid: resourcesBuildPhaseUuid } = proj.addBuildPhase(
    ["_locales", "manifest.json", "public"],
    "PBXResourcesBuildPhase",
    groupName,
    targetUuid,
    "app_extension",
    buildPath
  );
  console.log(`Added PBXResourcesBuildPhase ${resourcesBuildPhaseUuid}`);

  // Add shell script build phase
  // const { uuid: bundleShellScriptBuildPhaseUuid } = proj.addBuildPhase(
  //   [],
  //   "PBXShellScriptBuildPhase",
  //   "Bundle React Native code and images",
  //   targetUuid,
  //   {
  //     shellPath: "/bin/sh",
  //     shellScript: `export NODE_BINARY=node\\nexport ENTRY_FILE=${entryPoint}\\n\\n# The project root by default is one level up from the ios directory\\nexport PROJECT_ROOT=\"$PROJECT_DIR\"/..\\n\\n\`node --print \"require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/react-native-xcode.sh'\"\`\\n`,
  //   },
  //   buildPath
  // );
  // console.log(
  //   `Added PBXShellScriptBuildPhase ${bundleShellScriptBuildPhaseUuid}`
  // );
}

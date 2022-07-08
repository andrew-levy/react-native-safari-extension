import { XcodeProject } from "@expo/config-plugins";

import { PBXFile, quoted } from "../utils";

type AddBuildPhaseParams = {
  groupName: string;
  productFile: PBXFile;
  targetUuid: string;
  extensionName: string;
};

export default function addBuildPhases(
  proj: XcodeProject,
  { groupName, productFile, targetUuid, extensionName }: AddBuildPhaseParams
) {
  const buildPath = quoted("");

  // Sources build phase
  const { uuid: sourcesBuildPhaseUuid } = proj.addBuildPhase(
    [`${extensionName}/SafariWebExtensionHandler.swift`],
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
    ["manifest.json", "public"],
    "PBXResourcesBuildPhase",
    groupName,
    targetUuid,
    "app_extension",
    buildPath
  );
  console.log(`Added PBXResourcesBuildPhase ${resourcesBuildPhaseUuid}`);
}

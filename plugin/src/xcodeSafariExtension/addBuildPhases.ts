import { XcodeProject } from "@expo/config-plugins";
import { PBXFile, quoted } from "../utils";

type AddBuildPhaseParams = {
  groupName: string;
  productFile: PBXFile;
  targetUuid: string;
};

export default function addBuildPhases(
  proj: XcodeProject,
  { groupName, productFile, targetUuid }: AddBuildPhaseParams
) {
  const buildPath = quoted("");

  // Sources build phase
  const { uuid: sourcesBuildPhaseUuid } = proj.addBuildPhase(
    ["SafariWebExtensionHandler.swift"],
    "PBXSourcesBuildPhase",
    groupName,
    targetUuid,
    "app_extension",
    buildPath
  );

  // Copy files build phase
  const { uuid: copyFilesBuildPhaseUuid } = proj.addBuildPhase(
    [productFile.path],
    "PBXCopyFilesBuildPhase",
    groupName,
    proj.getFirstTarget().uuid,
    "app_extension",
    buildPath
  );

  // Frameworks build phase
  const { uuid: frameworksBuildPhaseUuid } = proj.addBuildPhase(
    [],
    "PBXFrameworksBuildPhase",
    groupName,
    targetUuid,
    "app_extension",
    buildPath
  );

  // Resources build phase
  const { uuid: resourcesBuildPhaseUuid } = proj.addBuildPhase(
    ["src", "assets", "manifest.json"],
    "PBXResourcesBuildPhase",
    groupName,
    targetUuid,
    "app_extension",
    buildPath
  );
}

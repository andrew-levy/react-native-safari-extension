import { XcodeProject } from "@expo/config-plugins";
import fs from "fs";
import path from "path";
import { PBXFile, quoted } from "../utils";

type AddBuildPhaseParams = {
  groupName: string;
  productFile: PBXFile;
  targetUuid: string;
  extensionName: string;
  iosRoot: string;
};

export default function addBuildPhases(
  proj: XcodeProject,
  {
    groupName,
    productFile,
    targetUuid,
    extensionName,
    iosRoot,
  }: AddBuildPhaseParams
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

  const resources = fs
    .readdirSync(path.join(iosRoot, extensionName, "Resources"))
    .map((file) => {
      return `${extensionName}/Resources/${file}`;
    });

  // Resources build phase
  const { uuid: resourcesBuildPhaseUuid } = proj.addBuildPhase(
    resources,
    "PBXResourcesBuildPhase",
    groupName,
    targetUuid,
    "app_extension",
    buildPath
  );
}

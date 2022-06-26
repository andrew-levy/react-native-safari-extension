import { XcodeProject } from "@expo/config-plugins";

import addBuildPhases from "./addBuildPhases";
import addProductFile from "./addProductFile";
import addTargetDependency from "./addTargetDependency";
import addToPbxNativeTargetSection from "./addToPbxNativeTargetSection";
import addToPbxProjectSection from "./addToPbxProjectSection";
import addXCConfigurationList from "./addXCConfigurationList";

export async function addSafariExtensionXcodeTarget(
  proj: XcodeProject,
  {
    appName,
    extensionName,
    extensionFolder,
    extensionBundleIdentifier,
    extensionRootPath,
    platformProjectRoot,
    currentProjectVersion,
    marketingVersion,
  }: {
    appName: string;
    extensionName: string;
    extensionFolder: string;
    extensionBundleIdentifier: string;
    extensionRootPath: string;
    platformProjectRoot: string;
    currentProjectVersion: string;
    marketingVersion: string;
  }
) {
  if (proj.getFirstProject().firstProject.targets?.length > 1) return true;
  const targetUuid = proj.generateUuid();
  const groupName = "Embed Safari Extensions";

  // Add XCConfigurationList
  const xCConfigurationList = addXCConfigurationList(proj, {
    extensionFolder,
    extensionBundleIdentifier,
    currentProjectVersion,
    marketingVersion,
    extensionName,
  });

  // Add product file
  const productFile = addProductFile(
    proj,
    extensionFolder,
    targetUuid,
    groupName
  );

  // Add target
  const target = addToPbxNativeTargetSection(proj, {
    extensionFolder,
    targetUuid,
    productFile,
    xCConfigurationList,
  });

  // Add target to PBX project section
  addToPbxProjectSection(proj, target);

  // Add target dependency
  addTargetDependency(proj, target);

  // // Add build phases
  addBuildPhases(proj, {
    groupName,
    productFile,
    targetUuid,
    extensionRootPath,
  });

  // // Add PBXGroup
  // addPbxGroup(proj, { appName, extensionFolder, platformProjectRoot });

  return true;
}

import { XcodeProject } from "@expo/config-plugins";

import addBuildPhases from "./addBuildPhases";
import addPbxGroup from "./addPbxGroup";
import addProductFile from "./addProductFile";
import addTargetDependency from "./addTargetDependency";
import addToPbxNativeTargetSection from "./addToPbxNativeTargetSection";
import addToPbxProjectSection from "./addToPbxProjectSection";
import addXCConfigurationList from "./addXCConfigurationList";

type AddXCodeTargetParmas = {
  appName: string;
  extensionName: string;
  extensionBundleIdentifier: string;
  currentProjectVersion: string;
  marketingVersion: string;
};

export async function addSafariExtensionXcodeTarget(
  proj: XcodeProject,
  {
    appName,
    extensionName,
    extensionBundleIdentifier,
    currentProjectVersion,
    marketingVersion,
  }: AddXCodeTargetParmas
) {
  if (proj.getFirstProject().firstProject.targets?.length > 1) return true;
  const targetUuid = proj.generateUuid();
  const groupName = "Embed Safari Extensions";

  const xCConfigurationList = addXCConfigurationList(proj, {
    extensionBundleIdentifier,
    currentProjectVersion,
    marketingVersion,
    extensionName,
    appName,
  });
  const productFile = addProductFile(proj, extensionName, groupName);
  const target = addToPbxNativeTargetSection(proj, {
    extensionName,
    targetUuid,
    productFile,
    xCConfigurationList,
  });
  addToPbxProjectSection(proj, target);
  addTargetDependency(proj, target);
  addBuildPhases(proj, {
    groupName,
    productFile,
    targetUuid,
    extensionName,
  });
  addPbxGroup(proj);

  return true;
}

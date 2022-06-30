import { XcodeProject } from "@expo/config-plugins";

import { PBXFile, quoted } from "../utils";

export default function addToPbxNativeTargetSection(
  proj: XcodeProject,
  {
    extensionFolder,
    targetUuid,
    productFile,
    xCConfigurationList,
  }: {
    extensionFolder: string;
    targetUuid: string;
    productFile: PBXFile;
    xCConfigurationList: any;
  }
) {
  const target = {
    uuid: targetUuid,
    pbxNativeTarget: {
      isa: "PBXNativeTarget",
      name: extensionFolder,
      productName: extensionFolder,
      productReference: productFile.fileRef,
      productType: quoted("com.apple.product-type.app-extension"),
      buildConfigurationList: xCConfigurationList.uuid,
      buildPhases: [],
      buildRules: [],
      dependencies: [],
    },
  };

  proj.addToPbxNativeTargetSection(target);

  console.log(`Added PBXNativeTarget ${target.uuid}`);

  return target;
}

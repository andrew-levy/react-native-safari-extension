import { XcodeProject } from "@expo/config-plugins";

import { PBXFile, quoted } from "../utils";

export default function addToPbxNativeTargetSection(
  proj: XcodeProject,
  {
    extensionName,
    targetUuid,
    productFile,
    xCConfigurationList,
  }: {
    extensionName: string;
    targetUuid: string;
    productFile: PBXFile;
    xCConfigurationList: any;
  }
) {
  const target = {
    uuid: targetUuid,
    pbxNativeTarget: {
      isa: "PBXNativeTarget",
      name: extensionName,
      productName: extensionName,
      productReference: productFile.fileRef,
      productType: quoted("com.apple.product-type.app-extension"),
      buildConfigurationList: xCConfigurationList.uuid,
      buildPhases: [],
      buildRules: [],
      dependencies: [],
    },
  };

  proj.addToPbxNativeTargetSection(target);

  return target;
}

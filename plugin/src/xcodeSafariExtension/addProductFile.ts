import { XcodeProject } from "@expo/config-plugins";

export default function addProductFile(
  proj: XcodeProject,
  extensionName: string,
  groupName: string
) {
  const productFile = {
    basename: `${extensionName}.appex`,
    fileRef: proj.generateUuid(),
    uuid: proj.generateUuid(),
    group: groupName,
    explicitFileType: "wrapper.application",
    settings: {
      ATTRIBUTES: ["RemoveHeadersOnCopy"],
    },
    includeInIndex: 0,
    path: `${extensionName}.appex`,
    sourceTree: "BUILT_PRODUCTS_DIR",
  };

  proj.addToPbxFileReferenceSection(productFile);
  proj.addToPbxBuildFileSection(productFile);

  return productFile;
}

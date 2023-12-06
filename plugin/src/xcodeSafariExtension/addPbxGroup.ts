import { XcodeProject } from "@expo/config-plugins";

export default function addPbxGroup(
  proj: XcodeProject,
  { extensionName }: { extensionName: string }
) {
  // Add PBX group
  const { uuid: pbxGroupUuid } = proj.addPbxGroup(
    [
      "src",
      "assets",
      "manifest.json",
      "Info.plist",
      "SafariWebExtensionHandler.swift",
    ],
    extensionName,
    `../${extensionName}`
  );

  // Add PBXGroup to top level group
  const groups = proj.hash.project.objects["PBXGroup"];
  if (pbxGroupUuid) {
    Object.keys(groups).forEach(function (key) {
      if (groups[key].name === undefined && groups[key].path === undefined) {
        proj.addToPbxGroup(pbxGroupUuid, key);
      }
    });
  }
}

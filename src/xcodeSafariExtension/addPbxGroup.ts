import { XcodeProject } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";

export default function addPbxGroup(
  proj: XcodeProject,
  {
    appName,
    extensionFolder,
    platformProjectRoot,
  }: { appName: string; extensionFolder: string; platformProjectRoot: string }
) {
  // Add PBX group
  const { uuid: pbxGroupUuid } = proj.addPbxGroup(
    ["public", "_locales", "manifest.json"],
    "web-extension",
    path.join(platformProjectRoot, "..", "web-extension")
  );
  console.log(`Added PBXGroup ${pbxGroupUuid}`);

  // Add PBXGroup to top level group
  const groups = proj.hash.project.objects["PBXGroup"];
  if (pbxGroupUuid) {
    Object.keys(groups).forEach(function (key) {
      if (groups[key].name === undefined && groups[key].path === undefined) {
        proj.addToPbxGroup(pbxGroupUuid, key);
        console.log(
          `Added PBXGroup ${pbxGroupUuid} root PBXGroup group ${key}`
        );
      }
    });
  }
}

function copyFileSync(source: any, target: any) {
  let targetFile = target;

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source: any, target: any) {
  const targetPath = path.join(target, path.basename(source));
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const currentPath = path.join(source, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        copyFolderRecursiveSync(currentPath, targetPath);
      } else {
        copyFileSync(currentPath, targetPath);
      }
    });
  }
}

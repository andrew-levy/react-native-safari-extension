import * as util from "util";
import fs from "fs";
import path from "path";

export type PBXFile = any;

export const WEB_EXTENSION = "web-extension";

export function quoted(str: string) {
  return util.format(`"%s"`, str);
}

export function longComment(file: PBXFile) {
  return util.format("%s in %s", file.basename, file.group);
}

export function getExtensionIosFolderName(projectName: string) {
  return `${projectName}Extension`;
}
export function getExtensionBundleIdentifier(bundleIdentifier: string) {
  return `${bundleIdentifier}.Extension`;
}

export async function copyFolderRecursive(src: string, dest: string) {
  await fs.promises.mkdir(dest, { recursive: true });
  const files = await fs.promises.readdir(src);
  for (const file of files) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stats = await fs.promises.stat(srcFile);
    if (stats.isFile()) {
      await fs.promises.copyFile(srcFile, destFile);
    } else if (stats.isDirectory()) {
      await copyFolderRecursive(srcFile, destFile);
    }
  }
}

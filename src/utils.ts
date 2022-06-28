import * as util from "util";

export function getExtensionName(projectName: string) {
  return `${projectName} Extension`;
}

export function getExtensionFolder(projectName: string) {
  return `${projectName}Extension`;
}

export function getExtensionBundleIdentifier(bundleIdentifier: string) {
  return `${bundleIdentifier}.Extension`;
}

export type PBXFile = any;

export function quoted(str: string) {
  return util.format(`"%s"`, str);
}

export function longComment(file: PBXFile) {
  return util.format("%s in %s", file.basename, file.group);
}

import * as util from "util";

export type PBXFile = any;

export function quoted(str: string) {
  return util.format(`"%s"`, str);
}

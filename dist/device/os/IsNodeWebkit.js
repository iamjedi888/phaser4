import { IsNode } from "./IsNode";
export function IsNodeWebkit() {
  return IsNode() && !!process.versions.hasOwnProperty("node-webkit");
}

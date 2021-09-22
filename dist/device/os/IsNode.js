export function IsNode() {
  return typeof process !== "undefined" && typeof process.versions === "object" && process.versions.hasOwnProperty("node");
}

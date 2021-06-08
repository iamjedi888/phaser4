import { DepthFirstSearchRecursiveNested3D } from "./DepthFirstSearchRecursiveNested3D";
function GetInfo(entry) {
  const legend = entry.numChildren > 0 ? "Parent" : "Child";
  return `${legend} [ type=${entry.type}, name=${entry.name} ]`;
}
function LogChildren(entry) {
  console.group(GetInfo(entry.node));
  entry.children.forEach((child) => {
    if (child.children.length > 0) {
      LogChildren(child);
    } else {
      console.log(GetInfo(child.node));
    }
  });
  console.groupEnd();
}
export function ConsoleTreeChildren3D(parent) {
  const entries = DepthFirstSearchRecursiveNested3D(parent);
  if (parent.world === parent) {
    console.group("World");
  } else {
    console.group(GetInfo(parent));
  }
  entries.forEach((entry) => {
    if (entry.children.length) {
      LogChildren(entry);
    } else {
      console.log(GetInfo(entry.node));
    }
  });
  console.groupEnd();
}

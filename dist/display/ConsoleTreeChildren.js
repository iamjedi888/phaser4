function GetInfo(entry) {
  const legend = entry.getNumChildren() > 0 ? "Parent" : "Child";
  return `${legend} [ type=${entry.type}, id=${entry.id} name=${entry.name} ]`;
}
function LogChildren(entry) {
  console.group(GetInfo(entry));
  entry.getChildren().forEach((child) => {
    if (child.getNumChildren() > 0) {
      LogChildren(child);
    } else {
      console.log(GetInfo(child));
    }
  });
  console.groupEnd();
}
export function ConsoleTreeChildren(parent) {
  const entries = parent.getChildren();
  if (parent.hasOwnProperty("tag")) {
    console.group("World");
  } else {
    console.group(GetInfo(parent));
  }
  entries.forEach((entry) => {
    if (entry.getNumChildren() > 0) {
      LogChildren(entry);
    } else {
      console.log(GetInfo(entry));
    }
  });
  console.groupEnd();
}

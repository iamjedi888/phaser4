import {SetParent3D} from "./SetParent3D";
export function AddChildren3DAt(parent, index, ...children) {
  const parentChildren = parent.children;
  if (index >= 0 && index <= parentChildren.length) {
    children.reverse().forEach((child) => {
      children.splice(index, 0, child);
      SetParent3D(parent, child);
    });
  }
  return children;
}

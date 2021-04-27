import {SetParent3D} from "./SetParent3D";
export function AddChild3DAt(parent, index, child) {
  const children = parent.children;
  if (index >= 0 && index <= children.length) {
    SetParent3D(parent, child);
    children.splice(index, 0, child);
  }
  return child;
}

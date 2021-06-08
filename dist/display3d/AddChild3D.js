import { SetParent3D } from "./SetParent3D";
export function AddChild3D(parent, child) {
  parent.children.push(child);
  SetParent3D(parent, child);
  return child;
}

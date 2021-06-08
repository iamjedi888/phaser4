import { AddChild3D } from "./AddChild3D";
export function AddChildren3D(parent, ...children) {
  children.forEach((child) => {
    AddChild3D(parent, child);
  });
  return children;
}

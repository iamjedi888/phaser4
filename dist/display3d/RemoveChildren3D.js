import {RemoveChild3D} from "./RemoveChild3D";
export function RemoveChildren3D(parent, ...children) {
  children.forEach((child) => {
    RemoveChild3D(parent, child);
  });
  return children;
}

import {RemoveChild} from "./RemoveChild";
export function RemoveChildren(parent, ...children) {
  children.forEach((child) => {
    RemoveChild(parent, child);
  });
  return children;
}

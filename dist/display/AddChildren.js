import { AddChild } from "./AddChild";
export function AddChildren(parent, ...children) {
  children.forEach((child) => {
    AddChild(parent, child);
  });
  return children;
}

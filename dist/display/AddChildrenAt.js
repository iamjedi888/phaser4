import { AddChildAt } from "./AddChildAt";
export function AddChildrenAt(parent, index, ...children) {
  children.reverse().forEach((child) => {
    AddChildAt(parent, child, index);
  });
  return children;
}

import {SetParent} from "./SetParent";
export function AddChildAt(parent, index, child) {
  const children = parent.children;
  if (index >= 0 && index <= children.length) {
    SetParent(parent, child);
    children.splice(index, 0, child);
    child.transform.updateWorld();
  }
  return child;
}

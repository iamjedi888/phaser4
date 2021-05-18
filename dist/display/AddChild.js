import {SetParent} from "./SetParent";
export function AddChild(parent, child) {
  parent.children.push(child);
  SetParent(parent, child);
  child.updateWorldTransform();
  return child;
}

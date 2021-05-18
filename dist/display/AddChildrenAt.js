import {SetParent} from "./SetParent";
export function AddChildrenAt(parent, index, ...children) {
  const parentChildren = parent.children;
  if (index >= 0 && index <= parentChildren.length) {
    children.reverse().forEach((child) => {
      children.splice(index, 0, child);
      SetParent(parent, child);
      child.updateWorldTransform();
    });
  }
  return children;
}

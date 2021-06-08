import { DIRTY_CONST } from "../gameobjects/DIRTY_CONST";
import { GetChildIndex } from "./GetChildIndex";
export function BringChildToTop(parent, child) {
  const parentChildren = parent.children;
  const currentIndex = GetChildIndex(parent, child);
  if (currentIndex !== -1 && currentIndex < parentChildren.length) {
    parentChildren.splice(currentIndex, 1);
    parentChildren.push(child);
    child.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

import { DIRTY_CONST } from "../gameobjects/DIRTY_CONST";
import { GetChildIndex } from "./GetChildIndex";
export function SendChildToBack(parent, child) {
  const parentChildren = parent.children;
  const currentIndex = GetChildIndex(parent, child);
  if (currentIndex !== -1 && currentIndex > 0) {
    parentChildren.splice(currentIndex, 1);
    parentChildren.unshift(child);
    child.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

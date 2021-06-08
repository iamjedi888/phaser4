import { DIRTY_CONST } from "../gameobjects/DIRTY_CONST";
import { GetChildIndex } from "./GetChildIndex";
export function MoveChildDown(parent, child) {
  const parentChildren = parent.children;
  const currentIndex = GetChildIndex(parent, child);
  if (currentIndex > 0) {
    const child2 = parentChildren[currentIndex - 1];
    const index2 = parentChildren.indexOf(child2);
    parentChildren[currentIndex] = child2;
    parentChildren[index2] = child;
    child.setDirty(DIRTY_CONST.TRANSFORM);
    child2.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

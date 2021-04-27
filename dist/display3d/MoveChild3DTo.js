import {DIRTY_CONST} from "../gameobjects/DIRTY_CONST";
import {GetChild3DIndex} from "./GetChild3DIndex";
export function MoveChild3DTo(parent, child, index) {
  const parentChildren = parent.children;
  const currentIndex = GetChild3DIndex(parent, child);
  if (currentIndex === -1 || index < 0 || index >= parentChildren.length) {
    throw new Error("Index out of bounds");
  }
  if (currentIndex !== index) {
    parentChildren.splice(currentIndex, 1);
    parentChildren.splice(index, 0, child);
    child.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

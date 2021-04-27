import {DIRTY_CONST} from "../gameobjects/DIRTY_CONST";
export function RotateChildrenLeft(parent, total = 1) {
  const parentChildren = parent.children;
  let child = null;
  for (let i = 0; i < total; i++) {
    child = parentChildren.shift();
    parentChildren.push(child);
    child.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

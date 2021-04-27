import {DIRTY_CONST} from "../gameobjects/DIRTY_CONST";
export function ShuffleChildren(parent) {
  const children = parent.children;
  for (let i = children.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = children[i];
    children[i] = children[j];
    children[j] = temp;
    temp.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return children;
}

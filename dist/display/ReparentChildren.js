import { RemoveChildrenBetween } from "./RemoveChildrenBetween";
import { SetParent } from "./SetParent";
export function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
  const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
  SetParent(newParent, ...moved);
  moved.forEach((child) => {
    child.updateWorldTransform();
  });
  return moved;
}

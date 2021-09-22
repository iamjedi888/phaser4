import { AddChild } from "./AddChild";
import { RemoveChildrenBetween } from "./RemoveChildrenBetween";
export function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
  const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
  moved.forEach((child) => {
    AddChild(newParent, child);
  });
  return moved;
}

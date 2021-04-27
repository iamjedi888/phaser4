import {GetChildIndex} from "./GetChildIndex";
import {RemoveChildAt} from "./RemoveChildAt";
export function RemoveChild(parent, child) {
  const currentIndex = GetChildIndex(parent, child);
  if (currentIndex > -1) {
    RemoveChildAt(parent, currentIndex);
  }
  return child;
}

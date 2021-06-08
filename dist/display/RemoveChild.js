import { GetChildIndex } from "./GetChildIndex";
import { RemoveChildAt } from "./RemoveChildAt";
export function RemoveChild(parent, child) {
  if (child.hasParent()) {
    RemoveChildAt(parent, GetChildIndex(parent, child));
  }
  return child;
}

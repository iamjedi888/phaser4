import { GetChildAt } from "./GetChildAt";
import { RemoveChild } from "./RemoveChild";
export function RemoveChildAt(parent, index) {
  const child = GetChildAt(parent, index);
  return RemoveChild(parent, child);
}

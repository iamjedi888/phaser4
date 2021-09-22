import { GetFirstChildID } from "./GetFirstChildID";
import { GetNextSiblingID } from "./GetNextSiblingID";
import { GetParentID } from "./GetParentID";
export function MoveNext(id, rootID) {
  const firstChild = GetFirstChildID(id);
  if (firstChild > 0) {
    return firstChild;
  } else {
    const sibling = GetNextSiblingID(id);
    if (sibling === 0) {
      const parent = GetParentID(id);
      if (parent === rootID) {
        return 0;
      } else {
        return GetNextSiblingID(parent);
      }
    } else {
      return sibling;
    }
  }
}

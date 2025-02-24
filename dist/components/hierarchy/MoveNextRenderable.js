import { GetFirstChildID } from "./GetFirstChildID";
import { GetNextSiblingID } from "./GetNextSiblingID";
import { GetParentID } from "./GetParentID";
import { GetWorldID } from "./GetWorldID";
import { WillRenderChildren } from "../permissions/WillRenderChildren";
export function MoveNextRenderable(id) {
  const firstChild = GetFirstChildID(id);
  if (firstChild > 0 && WillRenderChildren(id)) {
    return firstChild;
  } else {
    const sibling = GetNextSiblingID(id);
    if (sibling === 0) {
      const parent = GetParentID(id);
      if (parent === GetWorldID(id)) {
        return 0;
      } else {
        return GetNextSiblingID(parent);
      }
    } else {
      return sibling;
    }
  }
}

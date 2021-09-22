import { GetLastChildID } from "../components/hierarchy/GetLastChildID";
import { GetNumChildren } from "../components/hierarchy/GetNumChildren";
import { IsValidParent } from "./IsValidParent";
import { LinkSiblings } from "../components/hierarchy/LinkSiblings";
import { RemoveChildIDFromCurrentParent } from "../components/hierarchy/RemoveChildIDFromCurrentParent";
import { SetAndUpdateParent } from "../components/hierarchy/SetAndUpdateParent";
import { SetFirstChildID } from "../components/hierarchy/SetFirstChildID";
import { SetLastChildID } from "../components/hierarchy/SetLastChildID";
export function AddChild(parent, child) {
  if (IsValidParent(parent, child)) {
    const childID = child.id;
    const parentID = parent.id;
    const numChildren = GetNumChildren(parentID);
    RemoveChildIDFromCurrentParent(childID, parentID);
    if (numChildren === 0) {
      SetFirstChildID(parentID, childID);
    } else {
      const lastChild = GetLastChildID(parentID);
      LinkSiblings(lastChild, childID);
    }
    SetLastChildID(parentID, childID);
    SetAndUpdateParent(parentID, childID);
    parent.onAddChild(childID);
  }
  return child;
}

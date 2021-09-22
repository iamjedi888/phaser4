import { GetNextSiblingID } from "./GetNextSiblingID";
import { GetParentID } from "./GetParentID";
import { LinkSiblings } from "./LinkSiblings";
import { SetLastChildID } from "./SetLastChildID";
import { SetNextSiblingID } from "./SetNextSiblingID";
export function AddChildIDAfter(afterID, childID) {
  const nextID = GetNextSiblingID(afterID);
  if (nextID) {
    LinkSiblings(childID, nextID);
  } else {
    SetNextSiblingID(childID, 0);
    const parentID = GetParentID(childID);
    SetLastChildID(parentID, childID);
  }
  LinkSiblings(afterID, childID);
}

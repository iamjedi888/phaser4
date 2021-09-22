import { GetParentID } from "./GetParentID";
import { GetPreviousSiblingID } from "./GetPreviousSiblingID";
import { LinkSiblings } from "./LinkSiblings";
import { SetFirstChildID } from "./SetFirstChildID";
import { SetPreviousSiblingID } from "./SetPreviousSiblingID";
export function AddChildIDBefore(beforeID, childID) {
  const prevID = GetPreviousSiblingID(beforeID);
  if (prevID) {
    LinkSiblings(prevID, childID);
  } else {
    SetPreviousSiblingID(childID, 0);
    const parentID = GetParentID(childID);
    SetFirstChildID(parentID, childID);
  }
  LinkSiblings(childID, beforeID);
}

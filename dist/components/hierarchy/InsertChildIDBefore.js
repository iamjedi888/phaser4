import { GetParentID } from "./GetParentID";
import { GetPreviousSiblingID } from "./GetPreviousSiblingID";
import { LinkSiblings } from "./LinkSiblings";
import { SetFirstChildID } from "./SetFirstChildID";
import { SetNextSiblingID } from "./SetNextSiblingID";
import { SetPreviousSiblingID } from "./SetPreviousSiblingID";
export function InsertChildIDBefore(beforeID, childID) {
  const prevID = GetPreviousSiblingID(beforeID);
  if (prevID) {
    SetNextSiblingID(prevID, childID);
  } else {
    const parentID = GetParentID(childID);
    SetFirstChildID(parentID, childID);
  }
  LinkSiblings(childID, beforeID);
  SetPreviousSiblingID(childID, prevID);
}

import { GetNextSiblingID } from "./GetNextSiblingID";
import { GetParentID } from "./GetParentID";
import { LinkSiblings } from "./LinkSiblings";
import { SetLastChildID } from "./SetLastChildID";
import { SetNextSiblingID } from "./SetNextSiblingID";
import { SetPreviousSiblingID } from "./SetPreviousSiblingID";
export function InsertChildIDAfter(afterID, childID) {
  const nextID = GetNextSiblingID(afterID);
  if (nextID) {
    SetPreviousSiblingID(nextID, childID);
  } else {
    const parentID = GetParentID(childID);
    SetLastChildID(parentID, childID);
  }
  SetNextSiblingID(childID, nextID);
  LinkSiblings(afterID, childID);
}

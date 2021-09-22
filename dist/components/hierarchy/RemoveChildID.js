import { ClearSiblings } from "./ClearSiblings";
import { GetFirstChildID } from "./GetFirstChildID";
import { GetLastChildID } from "./GetLastChildID";
import { GetNextSiblingID } from "./GetNextSiblingID";
import { GetParentID } from "./GetParentID";
import { GetPreviousSiblingID } from "./GetPreviousSiblingID";
import { LinkSiblings } from "./LinkSiblings";
import { SetFirstChildID } from "./SetFirstChildID";
import { SetLastChildID } from "./SetLastChildID";
export function RemoveChildID(childID) {
  const parentID = GetParentID(childID);
  const first = GetFirstChildID(parentID);
  const last = GetLastChildID(parentID);
  const prevID = GetPreviousSiblingID(childID);
  const nextID = GetNextSiblingID(childID);
  LinkSiblings(prevID, nextID);
  if (first === childID) {
    SetFirstChildID(parentID, nextID);
  }
  if (last === childID) {
    SetLastChildID(parentID, prevID);
  }
  ClearSiblings(childID);
}

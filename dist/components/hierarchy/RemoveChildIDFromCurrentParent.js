import { GetFirstChildID } from "./GetFirstChildID";
import { GetLastChildID } from "./GetLastChildID";
import { GetNextSiblingID } from "./GetNextSiblingID";
import { GetNumChildren } from "./GetNumChildren";
import { GetParentID } from "./GetParentID";
import { GetPreviousSiblingID } from "./GetPreviousSiblingID";
import { GetWorldFromID } from "./index";
import { RemoveWorldTag } from "./RemoveWorldTag";
import { SetDirtyParents } from "../dirty/SetDirtyParents";
import { SetFirstChildID } from "./SetFirstChildID";
import { SetLastChildID } from "./SetLastChildID";
import { SetNextSiblingID } from "./SetNextSiblingID";
import { SetNumChildren } from "./SetNumChildren";
import { SetParentID } from "./SetParentID";
import { SetPreviousSiblingID } from "./SetPreviousSiblingID";
export function RemoveChildIDFromCurrentParent(childID, newParentID) {
  const parentID = GetParentID(childID);
  if (parentID) {
    const firstID = GetFirstChildID(parentID);
    const lastID = GetLastChildID(parentID);
    const nextID = GetNextSiblingID(childID);
    const prevID = GetPreviousSiblingID(childID);
    if (childID === firstID) {
      SetFirstChildID(parentID, nextID);
    }
    if (childID === lastID) {
      SetLastChildID(parentID, prevID);
    }
    if (nextID) {
      SetPreviousSiblingID(nextID, prevID);
    }
    if (prevID) {
      SetNextSiblingID(prevID, nextID);
    }
    SetDirtyParents(childID);
    SetParentID(childID, 0);
    SetNumChildren(parentID, GetNumChildren(parentID) - 1);
  }
  const oldWorld = GetWorldFromID(childID);
  const newWorld = newParentID ? GetWorldFromID(newParentID) : null;
  if (oldWorld && oldWorld !== newWorld) {
    RemoveWorldTag(childID);
  }
}

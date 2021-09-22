import { GetNextSiblingID } from "../components/hierarchy/GetNextSiblingID";
import { InsertChildIDAfter } from "../components/hierarchy/InsertChildIDAfter";
import { RemoveChildID } from "../components/hierarchy/RemoveChildID";
export function MoveChildUp(child) {
  const childID = child.id;
  const nextID = GetNextSiblingID(childID);
  if (nextID) {
    RemoveChildID(childID);
    InsertChildIDAfter(nextID, childID);
  }
  return child;
}

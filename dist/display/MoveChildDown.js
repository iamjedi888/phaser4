import { GetPreviousSiblingID } from "../components/hierarchy/GetPreviousSiblingID";
import { InsertChildIDBefore } from "../components/hierarchy/InsertChildIDBefore";
import { RemoveChildID } from "../components/hierarchy/RemoveChildID";
export function MoveChildDown(child) {
  const childID = child.id;
  const prevID = GetPreviousSiblingID(childID);
  if (prevID) {
    RemoveChildID(childID);
    InsertChildIDBefore(prevID, childID);
  }
  return child;
}

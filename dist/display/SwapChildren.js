import { GetNextSiblingID } from "../components/hierarchy/GetNextSiblingID";
import { GetParentID } from "../components/hierarchy/GetParentID";
import { GetPreviousSiblingID } from "../components/hierarchy/GetPreviousSiblingID";
import { InsertChildIDAfter } from "../components/hierarchy/InsertChildIDAfter";
import { InsertChildIDBefore } from "../components/hierarchy/InsertChildIDBefore";
import { MoveChildDown } from "./MoveChildDown";
import { MoveChildUp } from "./MoveChildUp";
import { RemoveChildID } from "../components/hierarchy/RemoveChildID";
export function SwapChildren(child1, child2) {
  const child1ID = child1.id;
  const child2ID = child2.id;
  const parentID = GetParentID(child1ID);
  if (child2.hasParent(parentID)) {
    if (GetNextSiblingID(child1ID) === child2ID) {
      MoveChildUp(child1);
    } else if (GetPreviousSiblingID(child1ID) === child2ID) {
      MoveChildDown(child1);
    } else {
      const child1NextID = GetNextSiblingID(child1ID);
      const child1PrevID = GetPreviousSiblingID(child1ID);
      const child2NextID = GetNextSiblingID(child2ID);
      const child2PrevID = GetPreviousSiblingID(child2ID);
      RemoveChildID(child1ID);
      RemoveChildID(child2ID);
      if (child1NextID) {
        InsertChildIDBefore(child1NextID, child2ID);
      } else if (child1PrevID) {
        InsertChildIDAfter(child1PrevID, child2ID);
      }
      if (child2NextID) {
        InsertChildIDBefore(child2NextID, child1ID);
      } else if (child2PrevID) {
        InsertChildIDAfter(child2PrevID, child1ID);
      }
    }
  }
}

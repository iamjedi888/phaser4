import { DecreaseNumChildren } from "../components/hierarchy/DecreaseNumChildren";
import { GetNextSiblingID } from "../components/hierarchy/GetNextSiblingID";
import { GetNumChildren } from "../components/hierarchy/GetNumChildren";
import { GetParentID } from "../components/hierarchy/GetParentID";
import { GetPreviousSiblingID } from "../components/hierarchy/GetPreviousSiblingID";
import { InsertChildIDAfter } from "../components/hierarchy/InsertChildIDAfter";
import { InsertChildIDBefore } from "../components/hierarchy/InsertChildIDBefore";
import { RemoveChildID } from "../components/hierarchy/RemoveChildID";
export function ReplaceChild(target, source) {
  const targetID = target.id;
  const sourceID = source.id;
  const targetParentID = GetParentID(targetID);
  const sourceParentID = GetParentID(sourceID);
  if (targetParentID === sourceParentID) {
    if (GetNumChildren(targetParentID) === 2) {
      RemoveChildID(targetID);
    } else {
      const targetNextID = GetNextSiblingID(targetID);
      const targetPrevID = GetPreviousSiblingID(targetID);
      RemoveChildID(targetID);
      RemoveChildID(sourceID);
      if (targetNextID) {
        InsertChildIDBefore(targetNextID, sourceID);
      } else {
        InsertChildIDAfter(targetPrevID, sourceID);
      }
    }
    DecreaseNumChildren(targetParentID);
  } else {
    const targetNextID = GetNextSiblingID(targetID);
    const targetPrevID = GetPreviousSiblingID(targetID);
    RemoveChildID(targetID);
    RemoveChildID(sourceID);
    DecreaseNumChildren(sourceParentID);
    if (targetNextID) {
      InsertChildIDBefore(targetNextID, sourceID);
    } else {
      InsertChildIDAfter(targetPrevID, sourceID);
    }
  }
  return target;
}

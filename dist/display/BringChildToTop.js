import { GetLastChildID } from "../components/hierarchy/GetLastChildID";
import { GetNumChildren } from "../components/hierarchy/GetNumChildren";
import { GetParentID } from "../components/hierarchy/GetParentID";
import { InsertChildIDAfter } from "../components/hierarchy/InsertChildIDAfter";
import { SetDirtyParents } from "../components/dirty/SetDirtyParents";
export function BringChildToTop(child) {
  const childID = child.id;
  const parentID = GetParentID(childID);
  const numChildren = GetNumChildren(parentID);
  const last = GetLastChildID(parentID);
  if (parentID && numChildren > 0 && childID !== last) {
    InsertChildIDAfter(last, childID);
    SetDirtyParents(childID);
  }
  return child;
}

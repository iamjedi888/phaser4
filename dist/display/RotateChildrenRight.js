import { AddChildIDBefore } from "../components/hierarchy/AddChildIDBefore";
import { GetFirstChildID } from "../components/hierarchy/GetFirstChildID";
import { GetLastChildID } from "../components/hierarchy/GetLastChildID";
import { RemoveChildID } from "../components/hierarchy/RemoveChildID";
export function RotateChildrenRight(parent, total = 1) {
  const parentID = parent.id;
  for (let i = 0; i < total; i++) {
    const first = GetFirstChildID(parentID);
    const last = GetLastChildID(parentID);
    RemoveChildID(last);
    AddChildIDBefore(first, last);
  }
  return parent;
}

import { AddChildIDAfter } from "../components/hierarchy/AddChildIDAfter";
import { GetFirstChildID } from "../components/hierarchy/GetFirstChildID";
import { GetLastChildID } from "../components/hierarchy/GetLastChildID";
import { RemoveChildID } from "../components/hierarchy/RemoveChildID";
export function RotateChildrenLeft(parent, total = 1) {
  const parentID = parent.id;
  for (let i = 0; i < total; i++) {
    const first = GetFirstChildID(parentID);
    const last = GetLastChildID(parentID);
    RemoveChildID(first);
    AddChildIDAfter(last, first);
  }
  return parent;
}

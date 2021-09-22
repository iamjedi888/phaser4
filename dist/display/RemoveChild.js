import { DecreaseNumChildren } from "../components/hierarchy/DecreaseNumChildren";
import { RemoveChildID } from "../components/hierarchy/RemoveChildID";
export function RemoveChild(parent, child) {
  const childID = child.id;
  const parentID = parent.id;
  if (child.hasParent(parentID)) {
    RemoveChildID(childID);
    DecreaseNumChildren(parentID);
    parent.onRemoveChild(childID);
  }
  return child;
}

import { GetParentID } from "../components/hierarchy/GetParentID";
export function IsValidParent(parent, child) {
  return !(child.id === parent.id || parent.id === GetParentID(child.id));
}

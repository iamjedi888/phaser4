import { GetParentID } from "../components/hierarchy/GetParentID";
export function IsValidParent(parent, child) {
  const childID = child.id;
  const parentID = parent.id;
  return !(parentID === 0 || childID === parentID || parentID === GetParentID(childID));
}

import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function GetFirstChildID(parentID) {
  return HierarchyComponent.data[parentID][HIERARCHY.FIRST];
}

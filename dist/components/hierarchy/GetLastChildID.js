import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function GetLastChildID(parentID) {
  return HierarchyComponent.data[parentID][HIERARCHY.LAST];
}

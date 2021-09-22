import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function SetLastChildID(parentID, childID) {
  HierarchyComponent.data[parentID][HIERARCHY.LAST] = childID;
}

import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function SetFirstChildID(parentID, childID) {
  HierarchyComponent.data[parentID][HIERARCHY.FIRST] = childID;
}

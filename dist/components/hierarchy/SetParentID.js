import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function SetParentID(childID, parentID) {
  HierarchyComponent.data[childID][HIERARCHY.PARENT] = parentID;
}

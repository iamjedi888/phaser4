import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function SetNextSiblingID(parentID, childID) {
  HierarchyComponent.data[parentID][HIERARCHY.NEXT] = childID;
}

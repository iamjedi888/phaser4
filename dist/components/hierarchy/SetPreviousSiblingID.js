import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function SetPreviousSiblingID(parentID, childID) {
  HierarchyComponent.data[parentID][HIERARCHY.PREV] = childID;
}

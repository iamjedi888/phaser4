import { HierarchyComponent } from "./HierarchyComponent";
export function SetParentID(childID, parentID) {
  HierarchyComponent.parentID[childID] = parentID;
}

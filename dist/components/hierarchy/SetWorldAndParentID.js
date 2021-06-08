import { HierarchyComponent } from "./HierarchyComponent";
export function SetWorldAndParentID(id, worldID, parentID) {
  HierarchyComponent.worldID[id] = worldID;
  HierarchyComponent.parentID[id] = parentID;
}

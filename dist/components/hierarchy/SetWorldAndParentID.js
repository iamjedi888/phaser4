import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function SetWorldAndParentID(id, worldID, parentID) {
  HierarchyComponent.data[id][HIERARCHY.WORLD] = worldID;
  HierarchyComponent.data[id][HIERARCHY.PARENT] = parentID;
}

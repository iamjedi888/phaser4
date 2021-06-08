import { HierarchyComponent } from "./HierarchyComponent";
export function ClearWorldAndParentID(id) {
  HierarchyComponent.worldID[id] = 0;
  HierarchyComponent.parentID[id] = 0;
}

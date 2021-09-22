import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function GetWorldID(id) {
  return HierarchyComponent.data[id][HIERARCHY.WORLD];
}

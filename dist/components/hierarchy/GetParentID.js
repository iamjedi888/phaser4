import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function GetParentID(id) {
  return HierarchyComponent.data[id][HIERARCHY.PARENT];
}

import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function GetDepth(id) {
  return HierarchyComponent.data[id][HIERARCHY.DEPTH];
}

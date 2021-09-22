import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function GetNumChildren(id) {
  return HierarchyComponent.data[id][HIERARCHY.NUM_CHILDREN];
}

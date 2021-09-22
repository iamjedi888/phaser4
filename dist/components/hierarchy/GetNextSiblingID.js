import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function GetNextSiblingID(id) {
  return HierarchyComponent.data[id][HIERARCHY.NEXT];
}

import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function GetPreviousSiblingID(id) {
  return HierarchyComponent.data[id][HIERARCHY.PREV];
}

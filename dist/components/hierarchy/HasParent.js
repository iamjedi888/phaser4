import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function HasParent(id) {
  return HierarchyComponent.data[id][HIERARCHY.PARENT] > 0;
}

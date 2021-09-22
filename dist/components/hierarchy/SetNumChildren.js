import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function SetNumChildren(parentID, total) {
  HierarchyComponent.data[parentID][HIERARCHY.NUM_CHILDREN] = total;
}

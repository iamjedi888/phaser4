import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function IncreaseNumChildren(parentID, total = 1) {
  HierarchyComponent.data[parentID][HIERARCHY.NUM_CHILDREN] += total;
}

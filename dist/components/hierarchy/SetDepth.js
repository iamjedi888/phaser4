import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function SetDepth(id, depth) {
  HierarchyComponent.data[id][HIERARCHY.DEPTH] = depth;
}

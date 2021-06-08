import { HierarchyComponent } from "./HierarchyComponent";
export function SetDepth(id, depth) {
  HierarchyComponent.depth[id] = depth;
}

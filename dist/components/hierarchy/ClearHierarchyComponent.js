import { HierarchyComponent } from "./HierarchyComponent";
export function ClearHierarchyComponent(id) {
  HierarchyComponent.data[id].fill(0);
}

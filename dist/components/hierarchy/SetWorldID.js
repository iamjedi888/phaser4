import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
export function SetWorldID(id, worldID) {
  HierarchyComponent.data[id][HIERARCHY.WORLD] = worldID;
}

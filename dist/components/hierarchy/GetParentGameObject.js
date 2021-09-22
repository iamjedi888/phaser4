import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
import { GameObjectCache } from "../../gameobjects/GameObjectCache";
export function GetParentGameObject(id) {
  return GameObjectCache.get(HierarchyComponent.data[id][HIERARCHY.PARENT]);
}

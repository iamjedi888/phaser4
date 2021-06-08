import { GameObjectCache } from "../../gameobjects/GameObjectCache";
import { HierarchyComponent } from "./HierarchyComponent";
export function GetParentGameObject(id) {
  return GameObjectCache.get(HierarchyComponent.parentID[id]);
}

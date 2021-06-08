import { GameObjectTree } from "../../gameobjects/GameObjectTree";
import { HierarchyComponent } from "./HierarchyComponent";
export function SetNumChildren(id) {
  HierarchyComponent.numChildren[id] = GameObjectTree.get(id).length;
}

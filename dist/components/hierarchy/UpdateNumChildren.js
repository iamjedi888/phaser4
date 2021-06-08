import { GameObjectTree } from "../../gameobjects/GameObjectTree";
import { HierarchyComponent } from "./HierarchyComponent";
export function UpdateNumChildren(id) {
  HierarchyComponent.numChildren[id] = GameObjectTree.get(id).length;
}

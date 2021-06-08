import { GameObjectTree } from "../gameobjects/GameObjectTree";
export function GetChildIndex(parent, child) {
  return GameObjectTree.get(parent.id).indexOf(child.id);
}

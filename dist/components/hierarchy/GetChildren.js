import { GameObjectCache } from "../../gameobjects/GameObjectCache";
import { GameObjectTree } from "../../gameobjects/GameObjectTree";
export function GetChildren(id) {
  const out = [];
  GameObjectTree.get(id).forEach((childID) => {
    out.push(GameObjectCache.get(childID));
  });
  return out;
}

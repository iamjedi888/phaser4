import { GameObjectCache } from "../../gameobjects/GameObjectCache";
import { GetWorldID } from "./GetWorldID";
export function GetWorldFromParentID(parentID) {
  const worldID = GetWorldID(parentID);
  return GameObjectCache.get(worldID);
}

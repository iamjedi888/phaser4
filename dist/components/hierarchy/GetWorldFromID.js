import { GameObjectCache } from "../../gameobjects/GameObjectCache";
import { GetWorldID } from "./GetWorldID";
export function GetWorldFromID(childID) {
  const worldID = GetWorldID(childID);
  if (worldID) {
    return GameObjectCache.get(worldID);
  }
}

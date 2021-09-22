import { GameObjectCache } from "../gameobjects/GameObjectCache";
import { GetChildIDAtIndex } from "../components/hierarchy/GetChildIDAtIndex";
import { GetNumChildren } from "../components/hierarchy/GetNumChildren";
export function GetChildAt(parent, index) {
  const parentID = parent.id;
  if (index < 0 || index > GetNumChildren(parentID)) {
    throw new Error(`Index out of bounds: ${index}`);
  }
  const childID = GetChildIDAtIndex(parentID, index);
  return GameObjectCache.get(childID);
}

import { GameObjectCache } from "../../gameobjects/GameObjectCache";
import { GetFirstChildID } from "./GetFirstChildID";
import { GetNextSiblingID } from "./GetNextSiblingID";
export function GetChildrenFromParentID(id) {
  const out = [];
  let next = GetFirstChildID(id);
  while (next > 0) {
    out.push(GameObjectCache.get(next));
    next = GetNextSiblingID(next);
  }
  return out;
}

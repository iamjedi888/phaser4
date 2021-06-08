import { GetWorldID, SetParentID, SetWorldAndParentID, UpdateNumChildren } from "../components/hierarchy";
import { GameObjectCache } from "../gameobjects";
import { GameObjectTree } from "../gameobjects/GameObjectTree";
import { IsValidParent } from "./IsValidParent";
import { RemoveChild } from "./RemoveChild";
import { SetDirtyDisplayList } from "../components/dirty";
import { SetWorld } from "./SetWorld";
export function AddChild(parent, child) {
  const childID = child.id;
  const parentID = parent.id;
  const worldID = GetWorldID(parentID);
  const world = GameObjectCache.get(worldID);
  if (IsValidParent(parent, child)) {
    RemoveChild(child.getParent(), child);
    GameObjectTree.get(parentID).push(childID);
    SetWorldAndParentID(childID, worldID, parentID);
    SetParentID(childID, parentID);
    SetWorld(world, child);
    SetDirtyDisplayList(worldID);
    UpdateNumChildren(parentID);
  }
  return child;
}

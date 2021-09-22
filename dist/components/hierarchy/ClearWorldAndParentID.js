import { HIERARCHY, HierarchyComponent } from "./HierarchyComponent";
import { hasComponent, removeComponent } from "bitecs";
import { DecreaseNumChildren } from "./DecreaseNumChildren";
import { GameObjectCache } from "../../gameobjects/GameObjectCache";
import { GameObjectWorld } from "../../GameObjectWorld";
import { GetParentID } from "./GetParentID";
import { GetWorldID } from "./GetWorldID";
import { SetDirtyParents } from "../dirty/SetDirtyParents";
export function ClearWorldAndParentID(id) {
  const worldID = GetWorldID(id);
  const parentID = GetParentID(id);
  const world = GameObjectCache.get(worldID);
  HierarchyComponent.data[id][HIERARCHY.WORLD] = 0;
  HierarchyComponent.data[id][HIERARCHY.PARENT] = 0;
  if (world && hasComponent(GameObjectWorld, world.tag, id)) {
    removeComponent(GameObjectWorld, world.tag, id);
  }
  DecreaseNumChildren(parentID);
  SetDirtyParents(id);
}

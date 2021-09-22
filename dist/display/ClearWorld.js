import { HIERARCHY, HierarchyComponent } from "../components/hierarchy/HierarchyComponent";
import { GameObjectCache } from "../gameobjects/GameObjectCache";
import { GameObjectWorld } from "../GameObjectWorld";
import { removeComponent } from "bitecs";
export function ClearWorld(childID) {
  const worldID = HierarchyComponent.data[childID][HIERARCHY.WORLD];
  if (worldID !== 0) {
    const world = GameObjectCache.get(worldID);
    removeComponent(GameObjectWorld, world.tag, childID);
    HierarchyComponent.data[childID][HIERARCHY.WORLD] = 0;
    world.updateDisplayList = true;
  }
}

import { ClearWorld } from "./ClearWorld";
import { DepthFirstSearchFromParentID } from "../components/hierarchy/DepthFirstSearchFromParentID";
import { GameObjectWorld } from "../GameObjectWorld";
import { GetWorldID } from "../components/hierarchy/GetWorldID";
import { SetWorldID } from "../components/hierarchy/SetWorldID";
import { addComponent } from "bitecs";
export function SetWorld(world, ...entries) {
  const worldID = world.id;
  const worldTag = world.tag;
  let setNewWorld = false;
  entries.forEach((entry) => {
    const currentWorldID = GetWorldID(entry.id);
    const children = DepthFirstSearchFromParentID(entry.id, false);
    children.map((id) => {
      if (currentWorldID !== worldID) {
        if (currentWorldID > 0) {
          ClearWorld(id);
        }
        addComponent(GameObjectWorld, worldTag, id);
        SetWorldID(id, worldID);
        setNewWorld = true;
      }
    });
  });
  if (setNewWorld) {
    world.updateDisplayList = true;
  }
  return entries;
}

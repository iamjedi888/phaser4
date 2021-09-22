import { DepthFirstSearchFromParentID } from "./DepthFirstSearchFromParentID";
import { GameObjectWorld } from "../../GameObjectWorld";
import { SetDirtyChildColor } from "../dirty/SetDirtyChildColor";
import { SetWorldID } from "./SetWorldID";
import { addComponent } from "bitecs";
export function SetWorldTag(world, id) {
  const worldID = world.id;
  const worldTag = world.tag;
  const children = DepthFirstSearchFromParentID(id, false);
  children.map((childID) => {
    addComponent(GameObjectWorld, worldTag, childID);
    SetWorldID(childID, worldID);
  });
  world.updateDisplayList = true;
  SetDirtyChildColor(worldID);
}

import { GameObjectWorld } from "../GameObjectWorld";
import { addComponent } from "bitecs";
export function SetWorld(world, ...children) {
  children.forEach((child) => {
    addComponent(GameObjectWorld, world.tag, child.id);
  });
  return children;
}

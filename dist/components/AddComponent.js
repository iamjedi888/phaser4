import { addComponent } from "bitecs";
import { GameObjectWorld } from "../GameObjectWorld";
export function AddComponent(component, eid, world = GameObjectWorld) {
  addComponent(world, component, eid);
}

import { defineSystem } from "bitecs";
import { GameObjectWorld } from "../GameObjectWorld";
export function DefineSystem(update, world = GameObjectWorld) {
  const system = defineSystem(update);
  return () => system(world);
}

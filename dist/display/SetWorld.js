import {AddedToWorldEvent, RemovedFromWorldEvent} from "../gameobjects/events";
import {Emit} from "../events/Emit";
export function SetWorld(world, ...children) {
  children.forEach((child) => {
    if (child.world) {
      Emit(child.world, RemovedFromWorldEvent, child, child.world);
      Emit(child, RemovedFromWorldEvent, child, child.world);
    }
    child.world = world;
    Emit(world, AddedToWorldEvent, child, world);
    Emit(child, AddedToWorldEvent, child, world);
  });
  return children;
}

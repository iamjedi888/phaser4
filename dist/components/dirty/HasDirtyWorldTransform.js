import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function HasDirtyWorldTransform(id) {
  return !!DirtyComponent.data[id][DIRTY.WORLD_TRANSFORM];
}

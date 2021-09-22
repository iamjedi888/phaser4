import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function ClearDirtyWorldTransform(id) {
  DirtyComponent.data[id][DIRTY.WORLD_TRANSFORM] = 0;
}

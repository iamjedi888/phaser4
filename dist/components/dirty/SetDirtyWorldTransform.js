import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function SetDirtyWorldTransform(id) {
  DirtyComponent.data[id][DIRTY.WORLD_TRANSFORM] = 1;
}

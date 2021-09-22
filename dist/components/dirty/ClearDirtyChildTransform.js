import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function ClearDirtyChildTransform(id) {
  DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM] = 0;
}

import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function SetDirtyChildTransform(id) {
  DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM] = 1;
}

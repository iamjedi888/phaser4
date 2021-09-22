import { DIRTY, DirtyComponent } from "./DirtyComponent";
import { SetDirtyParents } from "./SetDirtyParents";
export function SetDirtyTransform(id) {
  DirtyComponent.data[id][DIRTY.TRANSFORM] = 1;
  SetDirtyParents(id);
}

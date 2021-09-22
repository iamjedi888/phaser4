import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function SetDirtyChildCache(id) {
  DirtyComponent.data[id][DIRTY.CHILD_CACHE] = 1;
}

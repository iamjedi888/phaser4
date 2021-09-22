import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function ClearDirtyChildCache(id) {
  DirtyComponent.data[id][DIRTY.CHILD_CACHE] = 0;
}

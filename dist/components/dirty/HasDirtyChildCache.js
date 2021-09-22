import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function HasDirtyChildCache(id) {
  return !!DirtyComponent.data[id][DIRTY.CHILD_CACHE];
}

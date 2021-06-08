import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyChildCache(id) {
  return Boolean(DirtyComponent.childCache[id]);
}

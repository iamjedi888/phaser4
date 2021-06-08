import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyChildCache(id) {
  DirtyComponent.childCache[id] = 1;
}

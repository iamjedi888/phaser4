import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function ClearDirtyTransform(id) {
  DirtyComponent.data[id][DIRTY.TRANSFORM] = 0;
}

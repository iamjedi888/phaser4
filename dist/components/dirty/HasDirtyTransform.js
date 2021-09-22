import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function HasDirtyTransform(id) {
  return !!DirtyComponent.data[id][DIRTY.TRANSFORM];
}

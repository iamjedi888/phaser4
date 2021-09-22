import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function HasDirtyChildTransform(id) {
  return !!DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM];
}

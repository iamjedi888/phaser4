import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function ClearDirty(id) {
  DirtyComponent.data[id][DIRTY.SELF] = 0;
}

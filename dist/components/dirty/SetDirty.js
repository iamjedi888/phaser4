import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function SetDirty(id) {
  DirtyComponent.data[id][DIRTY.SELF] = 1;
}

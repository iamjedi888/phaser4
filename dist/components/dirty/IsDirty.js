import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function IsDirty(id) {
  return !!DirtyComponent.data[id][DIRTY.SELF];
}

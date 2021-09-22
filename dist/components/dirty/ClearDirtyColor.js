import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function ClearDirtyColor(id) {
  DirtyComponent.data[id][DIRTY.COLOR] = 0;
}

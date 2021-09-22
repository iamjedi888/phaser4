import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function ClearDirtyChildColor(id) {
  DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 0;
}

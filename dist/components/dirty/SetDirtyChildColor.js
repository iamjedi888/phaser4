import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function SetDirtyChildColor(id) {
  DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 1;
}

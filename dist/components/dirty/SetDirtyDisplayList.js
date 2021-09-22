import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function SetDirtyDisplayList(id) {
  DirtyComponent.data[id][DIRTY.DISPLAY_LIST] = 1;
}

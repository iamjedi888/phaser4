import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function ClearDirtyDisplayList(id) {
  DirtyComponent.data[id][DIRTY.DISPLAY_LIST] = 0;
}

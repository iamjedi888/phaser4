import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function HasDirtyDisplayList(id) {
  return !!DirtyComponent.data[id][DIRTY.DISPLAY_LIST];
}

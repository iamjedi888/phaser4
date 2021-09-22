import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function HasDirtyChildColor(id) {
  return !!DirtyComponent.data[id][DIRTY.CHILD_COLOR];
}

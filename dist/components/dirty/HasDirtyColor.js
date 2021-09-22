import { DIRTY, DirtyComponent } from "./DirtyComponent";
export function HasDirtyColor(id) {
  return !!DirtyComponent.data[id][DIRTY.COLOR];
}

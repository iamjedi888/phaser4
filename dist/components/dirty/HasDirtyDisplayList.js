import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyDisplayList(id) {
  return Boolean(DirtyComponent.displayList[id]);
}

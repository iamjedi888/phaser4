import { DirtyComponent } from "./DirtyComponent";
export function ClearDirtyDisplayList(id) {
  DirtyComponent.displayList[id] = 0;
}

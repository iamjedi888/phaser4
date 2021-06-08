import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyDisplayList(id) {
  DirtyComponent.displayList[id] = 1;
}

import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyUpdate(id) {
  DirtyComponent.update[id] = 1;
}

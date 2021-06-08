import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyTransform(id) {
  DirtyComponent.transform[id] = 1;
}

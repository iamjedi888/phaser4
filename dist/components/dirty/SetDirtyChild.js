import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyChild(id) {
  DirtyComponent.child[id] = 1;
}

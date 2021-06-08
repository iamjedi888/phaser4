import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyAlpha(id) {
  DirtyComponent.alpha[id] = 1;
}

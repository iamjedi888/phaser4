import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyAlpha(id) {
  return Boolean(DirtyComponent.alpha[id]);
}

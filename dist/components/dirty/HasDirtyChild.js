import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyChild(id) {
  return Boolean(DirtyComponent.child[id]);
}

import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyUpdate(id) {
  return Boolean(DirtyComponent.update[id]);
}

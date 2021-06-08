import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyBounds(id) {
  return Boolean(DirtyComponent.bounds[id]);
}

import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyTransform(id) {
  return Boolean(DirtyComponent.transform[id]);
}

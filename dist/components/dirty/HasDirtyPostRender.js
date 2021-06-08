import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyPostRender(id) {
  return Boolean(DirtyComponent.postRender[id]);
}

import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyPostRender(id) {
  DirtyComponent.postRender[id] = 1;
}

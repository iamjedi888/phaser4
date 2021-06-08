import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyBounds(id) {
  DirtyComponent.bounds[id] = 1;
}

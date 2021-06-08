import { DirtyComponent } from "./DirtyComponent";
export function GetDirtyFrame(id) {
  return DirtyComponent.frame[id];
}

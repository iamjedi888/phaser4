import { DirtyComponent } from "./DirtyComponent";
export function IsDirtyFrame(id, gameFrame) {
  return DirtyComponent.frame[id] >= gameFrame;
}

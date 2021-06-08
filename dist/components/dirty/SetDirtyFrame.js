import { DirtyComponent } from "./DirtyComponent";
import { GameInstance } from "../../GameInstance";
export function SetDirtyFrame(id) {
  DirtyComponent.frame[id] = GameInstance.getFrame();
}

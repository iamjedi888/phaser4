import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyTextureFrame(id) {
  DirtyComponent.textureFrame[id] = 1;
}

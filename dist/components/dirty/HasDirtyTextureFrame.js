import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyTextureFrame(id) {
  return Boolean(DirtyComponent.textureFrame[id]);
}

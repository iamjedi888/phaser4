import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyTexture(id) {
  return Boolean(DirtyComponent.texture[id]);
}

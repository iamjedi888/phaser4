import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyTexture(id) {
  DirtyComponent.texture[id] = 1;
}

import { DirtyComponent } from "./DirtyComponent";
export function SetDirtyVertexColors(id) {
  DirtyComponent.vertexColors[id] = 1;
}

import { DirtyComponent } from "./DirtyComponent";
export function HasDirtyVertexColors(id) {
  return Boolean(DirtyComponent.vertexColors[id]);
}

import { QuadVertexComponent } from "./QuadVertexComponent";
export function SetQuadTextureIndex(id, textureIndex) {
  const data = QuadVertexComponent.values[id];
  if (data[4] !== textureIndex) {
    data[4] = textureIndex;
    data[13] = textureIndex;
    data[22] = textureIndex;
    data[31] = textureIndex;
    data[40] = textureIndex;
    data[49] = textureIndex;
  }
}

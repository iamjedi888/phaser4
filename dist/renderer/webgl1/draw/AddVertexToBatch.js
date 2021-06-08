import { VertexComponent } from "../../../components/vertices/VertexComponent";
export function AddVertexToBatch(id, offset, textureIndex, F32, U32) {
  VertexComponent.offset[id] = offset;
  F32[offset + 0] = VertexComponent.x[id];
  F32[offset + 1] = VertexComponent.y[id];
  F32[offset + 2] = VertexComponent.u[id];
  F32[offset + 3] = VertexComponent.v[id];
  F32[offset + 4] = textureIndex;
  U32[offset + 5] = VertexComponent.color[id];
  return offset + 6;
}

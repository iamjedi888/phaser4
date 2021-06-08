import { AddVertexToBatch } from "./AddVertexToBatch";
import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
import { QuadVertexComponent } from "../../../components/vertices/QuadVertexComponent";
import { SetTexture } from "../renderpass/SetTexture";
export function BatchTexturedQuad(texture, id, renderPass) {
  const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);
  const textureIndex = SetTexture(renderPass, texture);
  let vertOffset = AddVertexToBatch(QuadVertexComponent.v1[id], offset, textureIndex, F32, U32);
  vertOffset = AddVertexToBatch(QuadVertexComponent.v2[id], vertOffset, textureIndex, F32, U32);
  vertOffset = AddVertexToBatch(QuadVertexComponent.v3[id], vertOffset, textureIndex, F32, U32);
  AddVertexToBatch(QuadVertexComponent.v4[id], vertOffset, textureIndex, F32, U32);
}

import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
import { QuadVertexComponent } from "../../../components/vertices/QuadVertexComponent";
import { SetQuadTextureIndex } from "../../../components/vertices/SetQuadTextureIndex";
import { SetTexture } from "../renderpass/SetTexture";
export function BatchTexturedQuadBuffer(texture, id, renderPass) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  const textureIndex = SetTexture(texture);
  SetQuadTextureIndex(id, textureIndex);
  F32.set(QuadVertexComponent.values[id], offset);
}

import { BatchTexturedQuad } from "./BatchTexturedQuad";
import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
export function BatchSingleQuadFlipped(renderPass, x, y, width, height, u0, v0, u1, v1, textureIndex = 0) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  BatchTexturedQuad(F32, offset, textureIndex, x, y + height, x, y, x + width, y, x + width, y + height, u0, v0, u1, v1, 1, 1, 1, 1);
}

import { BatchTexturedQuad } from "./BatchTexturedQuad";
import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
export function BatchSingleQuad(renderPass, x, y, width, height, u0, v0, u1, v1, textureIndex = 0) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  BatchTexturedQuad(F32, offset, textureIndex, x, y, x, y + height, x + width, y + height, x + width, y, u0, v0, u1, v1, 1, 1, 1, 1);
}

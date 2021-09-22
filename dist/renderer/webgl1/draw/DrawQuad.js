import { BatchTexturedQuad } from "./BatchTexturedQuad";
import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
import { SetTexture } from "../renderpass/SetTexture";
export function DrawQuad(renderPass, texture, frame, x0, y0, x1, y1, x2, y2, x3, y3, alpha = 1) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  frame = texture.getFrame(frame);
  const textureIndex = SetTexture(texture);
  BatchTexturedQuad(F32, offset, textureIndex, x0, y0, x1, y1, x2, y2, x3, y3, frame.u0, frame.v0, frame.u1, frame.v1, 1, 1, 1, alpha);
}

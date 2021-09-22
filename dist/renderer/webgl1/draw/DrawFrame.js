import { BatchTexturedQuad } from "./BatchTexturedQuad";
import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
import { SetTexture } from "../renderpass/SetTexture";
export function DrawFrame(renderPass, texture, frame, x, y, alpha = 1, scaleX = 1, scaleY = 1) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  frame = texture.getFrame(frame);
  const textureIndex = SetTexture(texture);
  const displayWidth = frame.width * scaleX;
  const displayHeight = frame.height * scaleY;
  BatchTexturedQuad(F32, offset, textureIndex, x, y, x, y + displayHeight, x + displayWidth, y + displayHeight, x + displayWidth, y, frame.u0, frame.v0, frame.u1, frame.v1, 1, 1, 1, alpha);
}

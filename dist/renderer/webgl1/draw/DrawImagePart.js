import { BatchTexturedQuad } from "./BatchTexturedQuad";
import { Clamp } from "../../../math/Clamp";
import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
import { SetTexture } from "../renderpass/SetTexture";
export function DrawImagePart(renderPass, texture, x0, y0, x1, y1, dx, dy, dw, dh, alpha = 1) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  const frame = texture.firstFrame;
  const textureIndex = SetTexture(texture);
  const frameWidth = frame.width;
  const frameHeight = frame.height;
  x0 = Clamp(x0, 0, frameWidth);
  x1 = Clamp(x1, x0, frameWidth);
  y0 = Clamp(y0, 0, frameHeight);
  y1 = Clamp(y1, y0, frameHeight);
  const uRange = frame.u1 - frame.u0;
  const vRange = frame.v1 - frame.v0;
  const u0 = frame.u0 + uRange * (x0 / frameWidth);
  const v0 = frame.v0 + vRange * (y0 / frameHeight);
  const u1 = frame.u0 + uRange * (x1 / frameWidth);
  const v1 = frame.v0 + vRange * (y1 / frameHeight);
  if (dw === void 0 || dw === null) {
    dw = x1 - x0;
  }
  if (dh === void 0 || dh === null) {
    dh = y1 - y0;
  }
  BatchTexturedQuad(F32, offset, textureIndex, dx, dy, dx, dy + dh, dx + dw, dy + dh, dx + dw, dy, u0, v0, u1, v1, 1, 1, 1, alpha);
}

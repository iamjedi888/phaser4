import { Clamp } from "../../../math";
import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
import { PackColor } from "../colors/PackColor";
import { SetTexture } from "../renderpass/SetTexture";
export function DrawImagePart(renderPass, texture, x0, y0, x1, y1, dx, dy, dw, dh, alpha = 1) {
  const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);
  const packedColor = PackColor(16777215, alpha);
  const frame = texture.firstFrame;
  const textureIndex = SetTexture(renderPass, texture);
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
  F32[offset + 0] = dx;
  F32[offset + 1] = dy;
  F32[offset + 2] = u0;
  F32[offset + 3] = v0;
  F32[offset + 4] = textureIndex;
  U32[offset + 5] = packedColor;
  F32[offset + 6] = dx;
  F32[offset + 7] = dy + dh;
  F32[offset + 8] = u0;
  F32[offset + 9] = v1;
  F32[offset + 10] = textureIndex;
  U32[offset + 11] = packedColor;
  F32[offset + 12] = dx + dw;
  F32[offset + 13] = dy + dh;
  F32[offset + 14] = u1;
  F32[offset + 15] = v1;
  F32[offset + 16] = textureIndex;
  U32[offset + 17] = packedColor;
  F32[offset + 18] = dx + dw;
  F32[offset + 19] = dy;
  F32[offset + 20] = u1;
  F32[offset + 21] = v0;
  F32[offset + 22] = textureIndex;
  U32[offset + 23] = packedColor;
}

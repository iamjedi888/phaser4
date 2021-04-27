import {GetVertexBufferEntry} from "../renderpass/GetVertexBufferEntry";
export function BatchSingleQuad(renderPass, x, y, width, height, u0, v0, u1, v1, textureIndex = 0, packedColor = 4294967295) {
  const {F32, U32, offset} = GetVertexBufferEntry(renderPass, 1);
  F32[offset + 0] = x;
  F32[offset + 1] = y;
  F32[offset + 2] = u0;
  F32[offset + 3] = v1;
  F32[offset + 4] = textureIndex;
  U32[offset + 5] = packedColor;
  F32[offset + 6] = x;
  F32[offset + 7] = y + height;
  F32[offset + 8] = u0;
  F32[offset + 9] = v0;
  F32[offset + 10] = textureIndex;
  U32[offset + 11] = packedColor;
  F32[offset + 12] = x + width;
  F32[offset + 13] = y + height;
  F32[offset + 14] = u1;
  F32[offset + 15] = v0;
  F32[offset + 16] = textureIndex;
  U32[offset + 17] = packedColor;
  F32[offset + 18] = x + width;
  F32[offset + 19] = y;
  F32[offset + 20] = u1;
  F32[offset + 21] = v1;
  F32[offset + 22] = textureIndex;
  U32[offset + 23] = packedColor;
}

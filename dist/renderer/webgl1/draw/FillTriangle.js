import { BatchTriangle } from "./BatchTriangle";
import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
import { SetWhiteTexture } from "../renderpass/SetWhiteTexture";
export function FillTriangle(renderPass, x1, y1, x2, y2, x3, y3, red, green, blue, alpha) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 1);
  const textureIndex = SetWhiteTexture();
  BatchTriangle(F32, offset, textureIndex, x1, y1, x2, y2, x3, y3, red, green, blue, alpha);
}

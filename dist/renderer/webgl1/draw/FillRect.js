import { BatchQuad } from "./BatchQuad";
import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
import { SetWhiteTexture } from "../renderpass/SetWhiteTexture";
export function FillRect(renderPass, x, y, width, height, red, green, blue, alpha) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  const textureIndex = SetWhiteTexture();
  x = Math.round(x);
  y = Math.round(y);
  BatchQuad(F32, offset, textureIndex, x, y, x, y + height, x + width, y + height, x + width, y, red, green, blue, alpha);
}

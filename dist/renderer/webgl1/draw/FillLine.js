import { BatchQuad } from "./BatchQuad";
import { GetVertexBufferEntry } from "../renderpass/GetVertexBufferEntry";
import { SetWhiteTexture } from "../renderpass/SetWhiteTexture";
export function FillLine(renderPass, x1, y1, x2, y2, width, red, green, blue, alpha) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  const textureIndex = SetWhiteTexture();
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  width *= 0.5;
  const al0 = width * (y2 - y1) / len;
  const al1 = width * (x1 - x2) / len;
  const bl0 = width * (y2 - y1) / len;
  const bl1 = width * (x1 - x2) / len;
  BatchQuad(F32, offset, textureIndex, Math.floor(x1 + al0), Math.floor(y1 + al1), Math.floor(x1 - al0), Math.floor(y1 - al1), Math.floor(x2 - bl0), Math.floor(y2 - bl1), Math.floor(x2 + bl0), Math.floor(y2 + bl1), red, green, blue, alpha);
}

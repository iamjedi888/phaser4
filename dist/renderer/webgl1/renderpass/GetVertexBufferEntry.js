import { CurrentVertexBuffer } from "./CurrentVertexBuffer";
import { Flush } from "./Flush";
const bufferEntry = {
  buffer: null,
  F32: null,
  offset: 0
};
export function GetVertexBufferEntry(renderPass, addToCount = 0) {
  const buffer = CurrentVertexBuffer();
  if (renderPass.count + addToCount >= buffer.batchSize) {
    Flush(renderPass);
  }
  bufferEntry.buffer = buffer;
  bufferEntry.F32 = buffer.vertexViewF32;
  bufferEntry.offset = renderPass.count * buffer.entryElementSize;
  renderPass.count += addToCount;
  return bufferEntry;
}

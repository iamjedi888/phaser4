import {Flush} from "./Flush";
export function GetVertexBufferEntry(renderPass, addToCount = 0) {
  const buffer = renderPass.currentVertexBuffer;
  if (renderPass.count + addToCount >= buffer.batchSize) {
    Flush(renderPass);
  }
  const offset = buffer.indexed ? renderPass.count * buffer.entryElementSize : renderPass.count * buffer.vertexElementSize;
  renderPass.count += addToCount;
  return {
    buffer,
    F32: buffer.vertexViewF32,
    U32: buffer.vertexViewU32,
    offset
  };
}

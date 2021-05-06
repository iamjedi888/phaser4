import {GetVertexBufferEntry} from "../renderpass/GetVertexBufferEntry";
import {SetTexture} from "../renderpass/SetTexture";
export function BatchTexturedQuad(texture, vertices, renderPass) {
  const {F32, U32, offset} = GetVertexBufferEntry(renderPass, 1);
  const textureIndex = SetTexture(renderPass, texture);
  let vertOffset = offset;
  vertices.forEach((vertex) => {
    F32[vertOffset + 0] = vertex.x;
    F32[vertOffset + 1] = vertex.y;
    F32[vertOffset + 2] = vertex.u;
    F32[vertOffset + 3] = vertex.v;
    F32[vertOffset + 4] = textureIndex;
    U32[vertOffset + 5] = vertex.color;
    vertOffset += 6;
  });
}

import {AddVertexBuffer} from "./AddVertexBuffer";
import {BindVertexBuffer} from "./BindVertexBuffer";
export function SetVertexBuffer(renderPass, buffer) {
  const entry = AddVertexBuffer(renderPass, buffer);
  BindVertexBuffer(renderPass, entry);
  renderPass.currentVertexBuffer = entry;
}

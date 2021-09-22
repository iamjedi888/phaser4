import { AddVertexBuffer } from "./AddVertexBuffer";
import { BindVertexBuffer } from "./BindVertexBuffer";
export function SetVertexBuffer(buffer) {
  const entry = AddVertexBuffer(buffer);
  BindVertexBuffer(entry);
}

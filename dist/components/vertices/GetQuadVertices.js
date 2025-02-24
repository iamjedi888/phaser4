import { QuadVertexComponent } from "./QuadVertexComponent";
export function GetQuadVertices(id) {
  const data = QuadVertexComponent.values[id];
  const x0 = data[0];
  const y0 = data[1];
  const x1 = data[9];
  const y1 = data[10];
  const x2 = data[18];
  const y2 = data[19];
  const x3 = data[45];
  const y3 = data[46];
  return { x0, y0, x1, y1, x2, y2, x3, y3 };
}

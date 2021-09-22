import { QuadVertexComponent } from "./QuadVertexComponent";
export function SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3) {
  const data = QuadVertexComponent.values[id];
  data[0] = x0;
  data[1] = y0;
  data[9] = x1;
  data[10] = y1;
  data[18] = x2;
  data[19] = y2;
  data[27] = x0;
  data[28] = y0;
  data[36] = x2;
  data[37] = y2;
  data[45] = x3;
  data[46] = y3;
}

import { VertexComponent } from "./VertexComponent";
export function SetUV(id, u, v) {
  VertexComponent.u[id] = u;
  VertexComponent.v[id] = v;
}

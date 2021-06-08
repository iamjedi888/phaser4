import { Changed, defineQuery, defineSystem } from "bitecs";
import { Extent2DComponent } from "../transform/Extent2DComponent";
import { QuadVertexComponent } from "./QuadVertexComponent";
import { VertexComponent } from "./VertexComponent";
import { WorldMatrix2DComponent } from "../transform/WorldMatrix2DComponent";
const changedWorldExtentQuery = defineQuery([
  Changed(WorldMatrix2DComponent),
  Changed(Extent2DComponent)
]);
let entities;
const updateVertexPositionSystem = defineSystem((world) => {
  for (let i = 0; i < entities.length; i++) {
    const id = entities[i];
    const a = WorldMatrix2DComponent.a[id];
    const b = WorldMatrix2DComponent.b[id];
    const c = WorldMatrix2DComponent.c[id];
    const d = WorldMatrix2DComponent.d[id];
    const tx = WorldMatrix2DComponent.tx[id];
    const ty = WorldMatrix2DComponent.ty[id];
    const x = Extent2DComponent.x[id];
    const y = Extent2DComponent.y[id];
    const right = Extent2DComponent.right[id];
    const bottom = Extent2DComponent.bottom[id];
    const v1 = QuadVertexComponent.v1[id];
    const v2 = QuadVertexComponent.v2[id];
    const v3 = QuadVertexComponent.v3[id];
    const v4 = QuadVertexComponent.v4[id];
    VertexComponent.x[v1] = x * a + y * c + tx;
    VertexComponent.y[v1] = x * b + y * d + ty;
    VertexComponent.x[v2] = x * a + bottom * c + tx;
    VertexComponent.y[v2] = x * b + bottom * d + ty;
    VertexComponent.x[v3] = right * a + bottom * c + tx;
    VertexComponent.y[v3] = right * b + bottom * d + ty;
    VertexComponent.x[v4] = right * a + y * c + tx;
    VertexComponent.y[v4] = right * b + y * d + ty;
  }
  return world;
});
export const UpdateVertexPositionSystem = (world) => {
  entities = changedWorldExtentQuery(world);
  updateVertexPositionSystem(world);
  return entities;
};

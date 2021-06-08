import { Types, defineComponent } from "bitecs";
const WorldMatrix2D = defineComponent({
  a: Types.f32,
  b: Types.f32,
  c: Types.f32,
  d: Types.f32,
  tx: Types.f32,
  ty: Types.f32
});
export const WorldMatrix2DComponent = WorldMatrix2D;

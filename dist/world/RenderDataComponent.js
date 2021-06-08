import { Types, defineComponent } from "bitecs";
const RenderData = defineComponent({
  gameFrame: Types.ui32,
  dirtyFrame: Types.ui32,
  numRendered: Types.ui32,
  numRenderable: Types.ui32
});
export const RenderDataComponent = RenderData;

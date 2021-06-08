import { Types, defineComponent } from "bitecs";
const Dirty = defineComponent({
  frame: Types.ui32,
  transform: Types.ui32,
  update: Types.ui32,
  childCache: Types.ui32,
  postRender: Types.ui32,
  vertexColors: Types.ui32,
  bounds: Types.ui32,
  texture: Types.ui32,
  textureFrame: Types.ui32,
  alpha: Types.ui32,
  child: Types.ui32,
  displayList: Types.ui32
});
export const DirtyComponent = Dirty;

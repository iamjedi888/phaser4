import { Types, defineComponent } from 'bitecs';

const RenderData = defineComponent({
    gameFrame: Types.ui32,
    dirtyLocal: Types.ui32,
    dirtyVertices: Types.ui32,
    numChildren: Types.ui32,
    numRendered: Types.ui32,
    numRenderable: Types.ui32,
    rebuiltList: Types.ui8,
    rebuiltWorld: Types.ui8
});

export const RenderDataComponent = RenderData;

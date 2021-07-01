import { Types, defineComponent } from 'bitecs';

const QuadVertex = defineComponent({
    tl: Types.ui32,
    bl: Types.ui32,
    br: Types.ui32,
    tr: Types.ui32
});

export const QuadVertexComponent = QuadVertex;

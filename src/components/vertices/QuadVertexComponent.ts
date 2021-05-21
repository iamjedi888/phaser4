import { Types, defineComponent } from 'bitecs';

const QuadVertex = defineComponent({
    v1: Types.ui32,
    v2: Types.ui32,
    v3: Types.ui32,
    v4: Types.ui32
});

export const QuadVertexComponent = QuadVertex;

import { Types, defineComponent } from 'bitecs';

const Vertex = defineComponent({
    x: Types.f32,
    y: Types.f32,
    z: Types.f32,
    u: Types.f32,
    v: Types.f32,
    texture: Types.ui8,
    tint: Types.ui32,
    alpha: Types.f32,
    color: Types.ui32
});

export const VertexComponent = Vertex;

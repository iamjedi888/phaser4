import { Types, defineComponent } from 'bitecs';

const ColorMatrix = defineComponent({
    alpha: Types.f32,
    values: [ Types.f32, 20 ]
});

export const ColorMatrixComponent = ColorMatrix;

import { Types, defineComponent } from 'bitecs';

const Color = defineComponent({
    alpha: Types.f32,
    tint: Types.ui32
});

export const ColorComponent = Color;

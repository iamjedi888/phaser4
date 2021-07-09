import { Types, defineComponent } from 'bitecs';

const Color = defineComponent({
    red: Types.f32,
    green: Types.f32,
    blue: Types.f32,
    alpha: Types.f32
});

export const ColorComponent = Color;

import { Types, defineComponent } from 'bitecs';

const Color = defineComponent({
    red: Types.f32,
    green: Types.f32,
    blue: Types.f32,
    alpha: Types.f32,
    colorMatrix: [ Types.f32, 16 ],
    colorOffset: [ Types.f32, 4 ]
});

export const ColorComponent = Color;

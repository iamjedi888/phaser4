import { Types, defineComponent } from 'bitecs';

const Color = defineComponent({
    red: Types.ui8c,
    green: Types.ui8c,
    blue: Types.ui8c,
    alpha: Types.f32,
    colorMatrix: [ Types.f32, 16 ],
    colorOffset: [ Types.f32, 4 ]
});

export const ColorComponent = Color;

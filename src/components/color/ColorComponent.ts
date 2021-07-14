import { Types, defineComponent } from 'bitecs';

const Color = defineComponent({
    r: Types.ui8c,
    g: Types.ui8c,
    b: Types.ui8c,
    a: Types.f32,
    colorMatrix: [ Types.f32, 16 ],
    colorOffset: [ Types.f32, 4 ]
});

export const ColorComponent = Color;

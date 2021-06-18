import { Types, defineComponent } from 'bitecs';

const Bounds = defineComponent({
    x: Types.f32,
    y: Types.f32,
    width: Types.f32,
    height: Types.f32,
    right: Types.f32,
    bottom: Types.f32
});

export const BoundsComponent = Bounds;

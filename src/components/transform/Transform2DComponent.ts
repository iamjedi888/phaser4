import { Types, defineComponent } from 'bitecs';

const Transform2D = defineComponent({
    x: Types.f32,
    y: Types.f32,
    rotation: Types.f32,
    scaleX: Types.f32,
    scaleY: Types.f32,
    skewX: Types.f32,
    skewY: Types.f32,
    originX: Types.f32,
    originY: Types.f32,
    dirty: Types.ui32,
    local: [ Types.f32, 6 ],
    world: [ Types.f32, 6 ]
});

export const Transform2DComponent = Transform2D;

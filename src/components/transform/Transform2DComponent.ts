import { Types, defineComponent } from 'bitecs';

export const TRANSFORM = {
    X: 0,
    Y: 1,
    ROTATION: 2,
    SCALE_X: 3,
    SCALE_Y: 4,
    SKEW_X: 5,
    SKEW_Y: 6,
    AXIS_ALIGNED: 7,
    FRAME_X1: 8,
    FRAME_Y1: 9,
    FRAME_X2: 10,
    FRAME_Y2: 11,
    LOCAL_A: 12,
    LOCAL_B: 13,
    LOCAL_C: 14,
    LOCAL_D: 15,
    LOCAL_TX: 16,
    LOCAL_TY: 17,
    BOUNDS_X1: 18,
    BOUNDS_Y1: 19,
    BOUNDS_X2: 20,
    BOUNDS_Y2: 21,
    ORIGIN_X: 22,
    ORIGIN_Y: 23,
    WORLD_A: 24,
    WORLD_B: 25,
    WORLD_C: 26,
    WORLD_D: 27,
    WORLD_TX: 28,
    WORLD_TY: 29,
    FRAME_WIDTH: 30,
    FRAME_HEIGHT: 31
};

export const Transform2DComponent = defineComponent({
    data: [ Types.f32, 32 ]
});

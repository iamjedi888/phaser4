import { Types, defineComponent } from 'bitecs';

export const TRANSFORM = {
    IS_ROOT: 0,
    DIRTY: 1,
    X: 2,
    Y: 3,
    ROTATION: 4,
    SCALE_X: 5,
    SCALE_Y: 6,
    SKEW_X: 7,
    SKEW_Y: 8,
    AXIS_ALIGNED: 9,
    FRAME_X1: 10,
    FRAME_Y1: 11,
    FRAME_X2: 12,
    FRAME_Y2: 13,
    LOCAL_A: 14,
    LOCAL_B: 15,
    LOCAL_C: 16,
    LOCAL_D: 17,
    LOCAL_TX: 18,
    LOCAL_TY: 19,
    BOUNDS_X1: 20,
    BOUNDS_Y1: 21,
    BOUNDS_X2: 22,
    BOUNDS_Y2: 23,
    ORIGIN_X: 24,
    ORIGIN_Y: 25,
    WORLD_A: 26,
    WORLD_B: 27,
    WORLD_C: 28,
    WORLD_D: 29,
    WORLD_TX: 30,
    WORLD_TY: 31,
    FRAME_WIDTH: 32,
    FRAME_HEIGHT: 33,
    DIRTY_WORLD: 34,
    RESERVED: 35
};

export const Transform2DComponent = defineComponent({
    data: [ Types.f32, 36 ]
});

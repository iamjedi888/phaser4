import { Types, defineComponent } from 'bitecs';

export const TRANSFORM = {
    IS_ROOT: 0,
    X: 1,
    Y: 2,
    ROTATION: 3,
    SCALE_X: 4,
    SCALE_Y: 5,
    SKEW_X: 6,
    SKEW_Y: 7,
    AXIS_ALIGNED: 8,
    FRAME_X1: 9,
    FRAME_Y1: 10,
    FRAME_X2: 11,
    FRAME_Y2: 12,
    LOCAL_A: 13,
    LOCAL_B: 14,
    LOCAL_C: 15,
    LOCAL_D: 16,
    LOCAL_TX: 17,
    LOCAL_TY: 18,
    BOUNDS_X1: 19,
    BOUNDS_Y1: 20,
    BOUNDS_X2: 21,
    BOUNDS_Y2: 22,
    ORIGIN_X: 23,
    ORIGIN_Y: 24,
    WORLD_A: 25,
    WORLD_B: 26,
    WORLD_C: 27,
    WORLD_D: 28,
    WORLD_TX: 29,
    WORLD_TY: 30,
    FRAME_WIDTH: 31,
    FRAME_HEIGHT: 32,
    IN_VIEW: 33,
    UPDATED: 34
};

export const Transform2DComponent = defineComponent({
    data: [ Types.f32, 35 ]
});

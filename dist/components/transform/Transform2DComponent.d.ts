/// <reference types="bitecs" />
export declare const TRANSFORM: {
    IS_ROOT: number;
    X: number;
    Y: number;
    ROTATION: number;
    SCALE_X: number;
    SCALE_Y: number;
    SKEW_X: number;
    SKEW_Y: number;
    AXIS_ALIGNED: number;
    FRAME_X1: number;
    FRAME_Y1: number;
    FRAME_X2: number;
    FRAME_Y2: number;
    LOCAL_A: number;
    LOCAL_B: number;
    LOCAL_C: number;
    LOCAL_D: number;
    LOCAL_TX: number;
    LOCAL_TY: number;
    BOUNDS_X1: number;
    BOUNDS_Y1: number;
    BOUNDS_X2: number;
    BOUNDS_Y2: number;
    ORIGIN_X: number;
    ORIGIN_Y: number;
    WORLD_A: number;
    WORLD_B: number;
    WORLD_C: number;
    WORLD_D: number;
    WORLD_TX: number;
    WORLD_TY: number;
    FRAME_WIDTH: number;
    FRAME_HEIGHT: number;
    IN_VIEW: number;
    UPDATED: number;
};
export declare const Transform2DComponent: import("bitecs").ComponentType<{
    data: ["f32", number];
}>;
//# sourceMappingURL=Transform2DComponent.d.ts.map
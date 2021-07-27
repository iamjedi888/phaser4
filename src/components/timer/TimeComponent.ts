import { Types, defineComponent } from 'bitecs';

export const TimeComponent = defineComponent({
    lastTick: Types.ui32,
    elapsed: Types.ui32,
    delta: Types.f32,
    fps: Types.f32,
    fpsCount: Types.ui16,
    frame: Types.ui32,
    ms: Types.ui32,
    prevFrame: Types.ui32
});

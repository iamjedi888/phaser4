import { Types, defineComponent } from 'bitecs';

const SceneRenderData = defineComponent({
    gameFrame: Types.ui32,
    numTotalFrames: Types.ui32,
    numDirtyFrames: Types.ui32,
    numDirtyCameras: Types.ui32
});

export const SceneRenderDataComponent = SceneRenderData;

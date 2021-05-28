import { Types, defineComponent } from 'bitecs';

const SceneRenderData = defineComponent({

    //  The current Game Frame number
    gameFrame: Types.ui32,

    //  How many Game Objects were processed this frame across all Scenes?
    numTotalFrames: Types.ui32,

    //  How many Game Objects were made dirty this frame across all Scenes?
    numDirtyFrames: Types.ui32,

    //  How many Cameras were made dirty this frame across all Scenes?
    numDirtyCameras: Types.ui32

});

export const SceneRenderDataComponent = SceneRenderData;

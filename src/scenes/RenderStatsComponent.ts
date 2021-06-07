import { Types, defineComponent } from 'bitecs';

const RenderStats = defineComponent({

    //  The current Game Frame number
    gameFrame: Types.ui32,

    //  Total number of Scenes rendered
    numScenes: Types.ui8,

    //  Total number of Worlds rendered
    numWorlds: Types.ui8,

    //  Total number of Game Objects (across all worlds)
    numGameObjects: Types.ui32,

    //  Total number of Game Objects to be rendered (across all worlds)
    numGameObjectsRendered: Types.ui32,

    //  Total number of Game Objects with dirty local transforms
    numDirtyLocalTransforms: Types.ui32,

    //  Total number of Game Objects with dirty world transforms
    numDirtyWorldTransforms: Types.ui32,

    //  Total number of Game Objects with dirty vertices
    numDirtyVertices: Types.ui32,

    //  Total number of Worlds that had to recalculate their display lists
    numDirtyWorldLists: Types.ui8,

    //  How many Cameras were made dirty this frame across all Scenes?
    numDirtyCameras: Types.ui32

});

export const RenderStatsComponent = RenderStats;

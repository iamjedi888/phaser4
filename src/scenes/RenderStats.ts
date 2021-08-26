export const RenderStats =
{
    fps: 0,
    delta: 0,

    //  The current Game Frame number
    gameFrame: 0,

    //  Total number of Scenes rendered
    numScenes: 0,

    //  Total number of Worlds rendered
    numWorlds: 0,

    //  Total number of Game Objects (across all worlds)
    numGameObjects: 0,

    //  Total number of Game Objects to be rendered (across all worlds)
    numGameObjectsRendered: 0,

    //  Total number of Game Objects with dirty local transforms
    numDirtyLocalTransforms: 0,

    //  Total number of Game Objects with dirty world transforms
    numDirtyWorldTransforms: 0,

    //  Total number of Game Objects with dirty vertices
    numDirtyVertices: 0,

    //  Total number of Worlds that had to recalculate their display lists
    numDirtyWorldLists: 0,

    //  How many Cameras were made dirty this frame across all Scenes?
    numDirtyCameras: 0
};

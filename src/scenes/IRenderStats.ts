export interface IRenderStats
{
    gameFrame: number;
    numScenes: number;
    numWorlds: number;
    numGameObjects: number;
    numGameObjectsRendered: number;
    numDirtyLocalTransforms: number;
    numDirtyWorldTransforms: number;
    numDirtyVertices: number;
    numDirtyWorldLists: number;
    numDirtyCameras: number;
}

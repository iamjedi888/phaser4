import { RenderStats } from './RenderStats';

export function ResetRenderStats (gameFrame: number, scenes: number): void
{
    RenderStats.gameFrame = gameFrame;
    RenderStats.numScenes = scenes;
    RenderStats.numWorlds = 0;
    RenderStats.numGameObjects = 0;
    RenderStats.numGameObjectsRendered = 0;
    RenderStats.numDirtyWorldLists = 0;
    RenderStats.numDirtyVertices = 0;
    RenderStats.numDirtyLocalTransforms = 0;
    RenderStats.numDirtyWorldTransforms = 0;
    RenderStats.numDirtyCameras = 0;
}

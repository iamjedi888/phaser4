import { RenderStatsComponent } from './RenderStatsComponent';

export function ResetRenderStats (id: number, gameFrame: number, scenes: number): void
{
    RenderStatsComponent.gameFrame[id] = gameFrame;
    RenderStatsComponent.numScenes[id] = scenes;
    RenderStatsComponent.numWorlds[id] = 0;
    RenderStatsComponent.numGameObjects[id] = 0;
    RenderStatsComponent.numGameObjectsRendered[id] = 0;
    RenderStatsComponent.numDirtyWorldLists[id] = 0;
    RenderStatsComponent.numDirtyVertices[id] = 0;
    RenderStatsComponent.numDirtyLocalTransforms[id] = 0;
    RenderStatsComponent.numDirtyWorldTransforms[id] = 0;
    RenderStatsComponent.numDirtyCameras[id] = 0;
}

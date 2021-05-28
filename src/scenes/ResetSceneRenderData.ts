import { SceneRenderDataComponent } from './SceneRenderDataComponent';

export function ResetSceneRenderData (id: number, gameFrame: number = 0): void
{
    SceneRenderDataComponent.gameFrame[id] = gameFrame;
    SceneRenderDataComponent.numTotalFrames[id] = 0;
    SceneRenderDataComponent.numDirtyFrames[id] = 0;
    SceneRenderDataComponent.numDirtyCameras[id] = 0;
}

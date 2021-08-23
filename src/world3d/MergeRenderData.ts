import { ISceneRenderData } from '../scenes/ISceneRenderData';
import { IWorld3DRenderData } from './IWorld3DRenderData';

export function MergeRenderData (sceneRenderData: ISceneRenderData, worldRenderData: IWorld3DRenderData): void
{
    sceneRenderData.numDirtyFrames += worldRenderData.dirtyFrame;
    sceneRenderData.numTotalFrames += worldRenderData.numRendered;

    if (worldRenderData.camera.dirtyRender)
    {
        sceneRenderData.numDirtyCameras++;
    }

    sceneRenderData.worldData.push(worldRenderData);
}

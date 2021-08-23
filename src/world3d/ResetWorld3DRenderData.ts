import { IWorld3DRenderData } from './IWorld3DRenderData';

export function ResetWorld3DRenderData (renderData: IWorld3DRenderData, gameFrame: number): void
{
    renderData.gameFrame = gameFrame;
    renderData.dirtyFrame = 0;
    renderData.numRendered = 0;
    renderData.numRenderable = 0;
}

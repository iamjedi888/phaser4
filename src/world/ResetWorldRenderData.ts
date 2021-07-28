import { RenderDataComponent } from './RenderDataComponent';

export function ResetWorldRenderData (id: number, gameFrame: number): void
{
    RenderDataComponent.gameFrame[id] = gameFrame;
    RenderDataComponent.dirtyLocal[id] = 0;
    RenderDataComponent.dirtyVertices[id] = 0;
    RenderDataComponent.numRendered[id] = 0;
}

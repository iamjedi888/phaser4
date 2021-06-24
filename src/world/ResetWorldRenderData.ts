import { RenderDataComponent } from './RenderDataComponent';

export function ResetWorldRenderData (id: number, gameFrame: number): void
{
    RenderDataComponent.gameFrame[id] = gameFrame;
    RenderDataComponent.dirtyFrame[id] = 0;
    RenderDataComponent.numRendered[id] = 0;
    RenderDataComponent.numRenderable[id] = 0;
}

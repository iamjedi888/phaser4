import { IWorldRenderData } from './IWorldRenderData';

export function ResetWorldRenderData (renderData: IWorldRenderData): void
{
    renderData.rendered = 0;
    renderData.dirtyColor = 0;
    renderData.dirtyLocal = 0;
    renderData.dirtyView = 0;
    renderData.dirtyWorld = 0;
    renderData.dirtyQuad = 0;
    renderData.processed = 0;
    renderData.renderMs = 0;
    renderData.numChildren = 0;
    renderData.preRenderMs = 0;
    renderData.updated = 0;
    renderData.updateMs = 0;
}

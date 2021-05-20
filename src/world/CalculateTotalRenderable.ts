import { IWorldRenderData } from './IWorldRenderData';
import { IsDirtyFrame } from '../components/dirty';
import { SearchEntry } from '../display/SearchEntryType';

export function CalculateTotalRenderable (entry: SearchEntry, renderData: IWorldRenderData): void
{
    renderData.numRendered++;
    renderData.numRenderable++;

    if (IsDirtyFrame(entry.node.id, renderData.gameFrame))
    {
        renderData.dirtyFrame++;
    }

    entry.children.forEach(child =>
    {
        if (child.children.length > 0)
        {
            CalculateTotalRenderable(child, renderData);
        }
    });
}

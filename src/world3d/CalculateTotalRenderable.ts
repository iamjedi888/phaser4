import { IWorld3DRenderData } from './IWorld3DRenderData';
import { SearchEntry3D } from '../display3d/SearchEntry3DType';

export function CalculateTotalRenderable (entry: SearchEntry3D, renderData: IWorld3DRenderData): void
{
    renderData.numRendered++;
    renderData.numRenderable++;

    if (entry.node.dirtyFrame >= renderData.gameFrame)
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

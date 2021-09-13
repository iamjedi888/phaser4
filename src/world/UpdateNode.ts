import { ClearDirtyColor } from '../components/dirty/ClearDirtyColor';
import { ColorComponent } from '../components/color/ColorComponent';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { HasDirtyColor } from '../components/dirty/HasDirtyColor';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { HasDirtyWorldTransform } from '../components/dirty/HasDirtyWorldTransform';
import { IWorldRenderData } from './IWorldRenderData';
import { SetInViewFromBounds } from '../components/transform/SetInViewFromBounds';
import { SetQuadColor } from '../components/vertices/SetQuadColor';
import { UpdateTransforms } from '../components/transform/UpdateTransforms';
import { UpdateWorldTransform } from '../components/transform/UpdateWorldTransform';

export function UpdateNode (id: number, parentID: number, checkColor: boolean, checkTransform: boolean, cx: number, cy: number, cright: number, cbottom: number, forceUpdate: boolean, parentIsDisplayList: boolean, renderData?: IWorldRenderData): void
{
    renderData.dirtyQuad++;

    if (checkColor && HasDirtyColor(id))
    {
        const r = ColorComponent.r[id] / 255;
        const g = ColorComponent.g[id] / 255;
        const b = ColorComponent.b[id] / 255;
        const a = ColorComponent.a[id];

        SetQuadColor(id, r, g, b, a);

        ClearDirtyColor(id);

        renderData.dirtyColor++;
    }

    if (checkTransform)
    {
        let hasUpdated = false;

        if (HasDirtyTransform(id))
        {
            UpdateTransforms(id, cx, cy, cright, cbottom, forceUpdate, parentIsDisplayList);

            hasUpdated = true;

            renderData.dirtyLocal++;
        }
        else if (HasDirtyWorldTransform(parentID))
        {
            UpdateWorldTransform(id, parentID, cx, cy, cright, cbottom, forceUpdate, parentIsDisplayList);

            hasUpdated = true;

            renderData.dirtyWorld++;
        }
        else if (forceUpdate)
        {
            SetInViewFromBounds(id, cx, cy, cright, cbottom);

            renderData.dirtyView++;
        }

        if (hasUpdated && parentIsDisplayList)
        {
            GameObjectCache.get(parentID).onUpdateChild(id);
        }
    }
}

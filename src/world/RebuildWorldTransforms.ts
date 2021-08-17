import { ClearDirtyTransform } from '../components/dirty/ClearDirtyTransform';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { IBaseWorld } from './IBaseWorld';
import { MoveNextRenderable } from '../components/hierarchy/MoveNextRenderable';
import { UpdateWorldTransform } from '../components/transform/UpdateWorldTransform';
import { WillRender } from '../components/permissions/WillRender';

export function RebuildWorldTransforms (world: IBaseWorld): void
{
    let next = GetFirstChildID(world.id);

    while (next > 0)
    {
        if (HasDirtyTransform(next) && WillRender(next))
        {
            UpdateWorldTransform(next);

            ClearDirtyTransform(next);
        }

        next = MoveNextRenderable(next);
    }
}

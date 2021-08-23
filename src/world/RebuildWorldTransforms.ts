import { ClearDirtyTransform } from '../components/dirty/ClearDirtyTransform';
import { GetParentID } from '../components/hierarchy/GetParentID';
import { HasDirtyChildTransform } from '../components/dirty/HasDirtyChildTransform';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { UpdateWorldTransform } from '../components/transform/UpdateWorldTransform';

export function RebuildWorldTransforms (entities: number[]): number
{
    let total = 0;

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];
        const parentID = GetParentID(id);

        if (HasDirtyTransform(id) || HasDirtyChildTransform(parentID))
        {
            UpdateWorldTransform(id);

            ClearDirtyTransform(id);

            total++;
        }
    }

    return total;
}

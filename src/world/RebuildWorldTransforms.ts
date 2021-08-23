import { ClearDirtyTransform } from '../components/dirty/ClearDirtyTransform';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { UpdateWorldTransform } from '../components/transform/UpdateWorldTransform';

export function RebuildWorldTransforms (entities: number[]): number
{
    let total = 0;

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        if (HasDirtyTransform(id))
        {
            UpdateWorldTransform(id);

            ClearDirtyTransform(id);

            total++;
        }
    }

    return total;
}

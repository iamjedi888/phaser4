import { ClearDirtyChildTransform } from '../dirty/ClearDirtyChildTransform';
import { ClearDirtyWorldTransform } from '../dirty/ClearDirtyWorldTransform';
import { HasDirtyWorldTransform } from '../dirty/HasDirtyWorldTransform';
import { SetQuadFromWorld } from './SetQuadFromWorld';

export function UpdateVertexPositionSystem (entities: number[]): number
{
    let total = 0;
    const len = entities.length;

    for (let i = 0; i < len; i++)
    {
        const id = entities[i];

        if (HasDirtyWorldTransform(id))
        {
            SetQuadFromWorld(id);

            ClearDirtyWorldTransform(id);
            ClearDirtyChildTransform(id);

            total++;
        }
    }

    return total;
}

import { GetNumChildren } from '../hierarchy/GetNumChildren';
import { HasDirtyTransform } from '../dirty/HasDirtyTransform';
import { SetDirtyChildTransform } from '../dirty/SetDirtyChildTransform';
import { SetDirtyChildWorldTransform } from '../dirty/SetDirtyChildWorldTransform';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function UpdateChildTransform (worldID: number, entities: number[], list: Uint32Array): number
{
    const len = entities.length;

    let index = 0;

    let dirtyWorld = false;

    //  We do this in its own sweep here (instead of as part of UpdatedLocalTransform)
    //  in order to maintain cache locality while iterating the Transform Data array

    for (let i = 0; i < len; i++)
    {
        const id = entities[i];

        if (HasDirtyTransform(id))
        {
            list[index] = id;

            index++;

            if (GetNumChildren(id) > 0 && WillTransformChildren(id))
            {
                //  If this entity is dirty and has children, we need HasDirtyChildWorldTransform to run
                SetDirtyChildTransform(id);

                dirtyWorld = true;
            }
        }
    }

    if (dirtyWorld)
    {
        SetDirtyChildWorldTransform(worldID);
    }

    return index;
}

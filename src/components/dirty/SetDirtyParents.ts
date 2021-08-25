import { GetParents } from '../hierarchy/GetParents';
import { GetWorldID } from '../hierarchy/GetWorldID';
import { SetDirtyChild } from './SetDirtyChild';
import { SetDirtyChildCache } from './SetDirtyChildCache';
import { SetDirtyChildTransform } from './SetDirtyChildTransform';
import { SetDirtyTransform } from './SetDirtyTransform';
import { WillCacheChildren } from '../permissions/WillCacheChildren';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function SetDirtyParents (childID: number): void
{
    const worldID = GetWorldID(childID);
    const parents = GetParents(childID);

    for (let i = 0; i < parents.length; i++)
    {
        const id = parents[i];

        SetDirtyChild(id);

        if (WillTransformChildren(id))
        {
            SetDirtyTransform(id);
        }

        if (WillCacheChildren(id))
        {
            SetDirtyChildCache(id);
        }

        if (id === worldID)
        {
            SetDirtyChildTransform(id);
        }
    }
}

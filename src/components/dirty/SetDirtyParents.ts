import { GetParentID } from '../hierarchy/GetParentID';
import { GetWorldID } from '../hierarchy/GetWorldID';
import { SetDirtyChild } from './SetDirtyChild';
import { SetDirtyChildCache } from './SetDirtyChildCache';
import { SetDirtyChildTransform } from './SetDirtyChildTransform';
import { WillCacheChildren } from '../permissions/WillCacheChildren';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function SetDirtyParents (childID: number): void
{
    const worldID = GetWorldID(childID);

    let id = GetParentID(childID);

    while (id !== worldID)
    {
        SetDirtyChild(id);

        if (WillTransformChildren(id))
        {
            SetDirtyChildTransform(id);
        }

        if (WillCacheChildren(id))
        {
            SetDirtyChildCache(id);
        }

        id = GetParentID(id);
    }
}

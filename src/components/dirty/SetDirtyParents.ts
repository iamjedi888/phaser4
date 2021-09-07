import { GetParentID } from '../hierarchy/GetParentID';
import { SetDirtyChildCache } from './SetDirtyChildCache';
import { SetDirtyChildTransform } from './SetDirtyChildTransform';
import { WillCacheChildren } from '../permissions/WillCacheChildren';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function SetDirtyParents (childID: number): void
{
    // if (WillTransformChildren(childID))
    // {
    //     SetDirtyChildTransform(childID);
    // }

    let id = GetParentID(childID);

    while (id)
    {
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

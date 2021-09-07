import { GetParentID } from '../hierarchy/GetParentID';
import { SetDirtyChildCache } from './SetDirtyChildCache';
import { SetDirtyChildTransform } from './SetDirtyChildTransform';
import { WillCacheChildren } from '../permissions/WillCacheChildren';

export function SetDirtyParents (childID: number): void
{
    let id = GetParentID(childID);

    while (id)
    {
        SetDirtyChildTransform(id);

        if (WillCacheChildren(id))
        {
            SetDirtyChildCache(id);
        }

        id = GetParentID(id);
    }
}

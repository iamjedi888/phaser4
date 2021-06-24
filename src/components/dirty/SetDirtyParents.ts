import { GetParentID } from '../hierarchy';
import { SetDirtyChildCache } from './SetDirtyChildCache';
import { WillCacheChildren } from '../permissions';

export function SetDirtyParents (childID: number): void
{
    let currentParent = GetParentID(childID);

    while (currentParent)
    {
        if (WillCacheChildren(currentParent))
        {
            SetDirtyChildCache(currentParent);
        }

        currentParent = GetParentID(currentParent);
    }
}

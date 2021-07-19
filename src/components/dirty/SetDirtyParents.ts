import { GetParents, GetWorldID } from '../hierarchy';

import { SetDirtyChildCache } from './SetDirtyChildCache';
import { SetDirtyDisplayList } from './SetDirtyDisplayList';
import { WillCacheChildren } from '../permissions';

export function SetDirtyParents (childID: number): void
{
    const parents = GetParents(childID);

    parents.forEach(id =>
    {
        if (WillCacheChildren(id))
        {
            SetDirtyChildCache(id);
        }
    });

    SetDirtyDisplayList(GetWorldID(childID));
}

import { GetParents } from '../hierarchy/GetParents';
import { GetWorldID } from '../hierarchy/GetWorldID';
import { SetDirtyChildCache } from './SetDirtyChildCache';
import { SetDirtyDisplayList } from './SetDirtyDisplayList';
import { WillCacheChildren } from '../permissions/WillCacheChildren';

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

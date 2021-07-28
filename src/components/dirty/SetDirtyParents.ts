import { GetParents } from '../hierarchy/GetParents';
import { SetDirtyChildCache } from './SetDirtyChildCache';
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
}

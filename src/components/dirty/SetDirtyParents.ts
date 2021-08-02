import { GetParents } from '../hierarchy/GetParents';
import { SetDirtyChildCache } from './SetDirtyChildCache';
import { SetDirtyTransform } from './SetDirtyTransform';
import { WillCacheChildren } from '../permissions/WillCacheChildren';

export function SetDirtyParents (childID: number): void
{
    const parents = GetParents(childID);

    parents.forEach(id =>
    {
        if (WillCacheChildren(id))
        {
            SetDirtyTransform(id);
            SetDirtyChildCache(id);
        }
    });
}

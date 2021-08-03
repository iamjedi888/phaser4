import { GetParents } from '../hierarchy/GetParents';
import { SetDirtyChild } from './SetDirtyChild';
import { SetDirtyChildCache } from './SetDirtyChildCache';
import { SetDirtyTransform } from './SetDirtyTransform';
import { WillCacheChildren } from '../permissions/WillCacheChildren';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function SetDirtyParents (childID: number): void
{
    const parents = GetParents(childID);

    parents.forEach(id =>
    {
        SetDirtyChild(id);

        if (WillTransformChildren(id))
        {
            SetDirtyTransform(id);
        }

        if (WillCacheChildren(id))
        {
            SetDirtyChildCache(id);
        }
    });
}

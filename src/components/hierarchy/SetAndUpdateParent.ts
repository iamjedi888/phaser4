import { GetNumChildren } from './GetNumChildren';
import { GetWorldFromParentID } from './GetWorldFromParentID';
import { SetDirtyChildCache } from '../dirty/SetDirtyChildCache';
import { SetDirtyParents } from '../dirty/SetDirtyParents';
import { SetDirtyTransform } from '../dirty/SetDirtyTransform';
import { SetNumChildren } from './SetNumChildren';
import { SetParentID } from './SetParentID';
import { SetRootTransform } from '../transform/SetRootTransform';
import { SetWorldTag } from './SetWorldTag';
import { WillCacheChildren } from '../permissions/WillCacheChildren';

export function SetAndUpdateParent (parentID: number, childID: number, addChildren: number = 1): void
{
    SetParentID(childID, parentID);

    SetDirtyTransform(childID);
    SetDirtyParents(childID);
    SetRootTransform(childID);

    SetNumChildren(parentID, GetNumChildren(parentID) + addChildren);

    if (WillCacheChildren(parentID))
    {
        SetDirtyChildCache(parentID);
    }

    const world = GetWorldFromParentID(parentID);

    if (world)
    {
        SetWorldTag(world, childID);
    }
}

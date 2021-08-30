import { GetNumChildren } from './GetNumChildren';
import { GetWorldFromParentID } from './GetWorldFromParentID';
import { SetDirtyParents } from '../dirty/SetDirtyParents';
import { SetDirtyTransform } from '../dirty/SetDirtyTransform';
import { SetNumChildren } from './SetNumChildren';
import { SetParentID } from './SetParentID';
import { SetWorldTag } from './SetWorldTag';
import { UpdateRootTransform } from '../transform/UpdateRootTransform';

export function SetAndUpdateParent (parentID: number, childID: number, addChildren: number = 1): void
{
    SetParentID(childID, parentID);

    SetDirtyTransform(childID);
    SetDirtyParents(childID);
    UpdateRootTransform(childID);

    SetNumChildren(parentID, GetNumChildren(parentID) + addChildren);

    const world = GetWorldFromParentID(parentID);

    if (world)
    {
        SetWorldTag(world, childID);
    }
}

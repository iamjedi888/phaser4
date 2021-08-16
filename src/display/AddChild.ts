import { ClearHierarchyComponent } from '../components/hierarchy/ClearHierarchyComponent';
import { GetLastChildID } from '../components/hierarchy/GetLastChildID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { GetWorldFromParentID } from '../components/hierarchy/GetWorldFromParentID';
import { IGameObject } from '../gameobjects/IGameObject';
import { IsValidParent } from './IsValidParent';
import { SetDirtyParents } from '../components/dirty/SetDirtyParents';
import { SetDirtyTransform } from '../components/dirty/SetDirtyTransform';
import { SetFirstChildID } from '../components/hierarchy/SetFirstChildID';
import { SetIndex } from '../components/hierarchy/SetIndex';
import { SetLastChildID } from '../components/hierarchy/SetLastChildID';
import { SetNextSiblingID } from '../components/hierarchy/SetNextSiblingID';
import { SetNumChildren } from '../components/hierarchy/SetNumChildren';
import { SetParentID } from '../components/hierarchy/SetParentID';
import { SetPreviousSiblingID } from '../components/hierarchy/SetPreviousSiblingID';
import { SetWorld } from './SetWorld';

export function AddChild <P extends IGameObject, C extends IGameObject> (parent: P, child: C): C
{
    if (IsValidParent(parent, child))
    {
        const childID = child.id;
        const parentID = parent.id;
        const numChildren = GetNumChildren(parentID);
        const world = GetWorldFromParentID(parentID);

        ClearHierarchyComponent(childID);

        //  RemoveChild from previous parent (if any)

        if (numChildren === 0)
        {
            SetIndex(childID, 0);
            SetFirstChildID(parentID, childID);
        }
        else
        {
            const lastChild = GetLastChildID(parentID);

            SetNextSiblingID(lastChild, childID);
            SetPreviousSiblingID(childID, lastChild);
            SetIndex(childID, numChildren);
        }

        SetParentID(childID, parentID);
        SetDirtyTransform(childID);
        SetDirtyParents(childID);

        SetLastChildID(parentID, childID);
        SetNumChildren(parentID, numChildren + 1);

        if (world)
        {
            SetWorld(world, child);
        }
    }

    return child;
}

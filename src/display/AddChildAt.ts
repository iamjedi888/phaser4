import { ClearHierarchyComponent } from '../components/hierarchy/ClearHierarchyComponent';
import { GetLastChildID } from '../components/hierarchy/GetLastChildID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { GetWorldFromParentID } from '../components/hierarchy/GetWorldFromParentID';
import { IGameObject } from '../gameobjects/IGameObject';
import { IsValidParent } from './IsValidParent';
import { RemoveChild } from './RemoveChild';
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
import { UpdateIndexes } from '../components/hierarchy/UpdateIndexes';

export function AddChildAt <P extends IGameObject, C extends IGameObject> (parent: P, child: C, index: number): C
{
    if (IsValidParent(parent, child))
    {
        const childID = child.id;
        const parentID = parent.id;
        const numChildren = GetNumChildren(parentID);
        const world = GetWorldFromParentID(parentID);

        ClearHierarchyComponent(childID);

        //  Adding to the right-most part of the parent
        if (index === -1)
        {
            if (numChildren === 0)
            {
                SetIndex(childID, 0);
                SetFirstChildID(parentID, childID);
                SetLastChildID(parentID, childID);
            }
            else
            {
                const lastChild = GetLastChildID(parentID);

                SetNextSiblingID(lastChild, childID);
                SetPreviousSiblingID(childID, lastChild);
                SetIndex(childID, numChildren);
                SetLastChildID(parentID, childID);
            }

            SetParentID(childID, parentID);
            SetNumChildren(parentID, numChildren + 1);
            SetDirtyTransform(childID);
        }
        else
        {
            //  TODO
        }

        SetDirtyParents(childID);

        if (world)
        {
            SetWorld(world, child);
        }

        /*
        const children = GameObjectTree.get(parentID);

        if (index === -1)
        {
            index = children.length;
        }

        if (index >= 0 && index <= children.length)
        {
            RemoveChild(child.getParent(), child);

            //  Always modify the array before calling SetParentID
            children.splice(index, 0, childID);

            SetParentID(childID, parentID);

            UpdateIndexes(childID);

            SetDirtyParents(childID);

            if (world)
            {
                SetWorld(world, child);
            }
        }
        */
    }

    return child;
}

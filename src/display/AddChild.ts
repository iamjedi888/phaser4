import { GetLastChildID } from '../components/hierarchy/GetLastChildID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { IGameObject } from '../gameobjects/IGameObject';
import { IsValidParent } from './IsValidParent';
import { RemoveChildIDFromCurrentParent } from '../components/hierarchy/RemoveChildIDFromCurrentParent';
import { SetAndUpdateParent } from '../components/hierarchy/SetAndUpdateParent';
import { SetFirstChildID } from '../components/hierarchy/SetFirstChildID';
import { SetLastChildID } from '../components/hierarchy/SetLastChildID';
import { SetNextSiblingID } from '../components/hierarchy/SetNextSiblingID';
import { SetPreviousSiblingID } from '../components/hierarchy/SetPreviousSiblingID';

export function AddChild <P extends IGameObject, C extends IGameObject> (parent: P, child: C): C
{
    if (IsValidParent(parent, child))
    {
        const childID = child.id;
        const parentID = parent.id;
        const numChildren = GetNumChildren(parentID);

        RemoveChildIDFromCurrentParent(childID, parentID);

        if (numChildren === 0)
        {
            SetFirstChildID(parentID, childID);
        }
        else
        {
            const lastChild = GetLastChildID(parentID);

            SetNextSiblingID(lastChild, childID);
            SetPreviousSiblingID(childID, lastChild);
        }

        SetLastChildID(parentID, childID);

        SetAndUpdateParent(parentID, childID);
    }

    return child;
}

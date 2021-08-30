import { GetParentGameObject } from '../components/hierarchy/GetParentGameObject';
import { GetPreviousSiblingID } from '../components/hierarchy/GetPreviousSiblingID';
import { IGameObject } from '../gameobjects/IGameObject';
import { IsValidParent } from './IsValidParent';
import { RemoveChildIDFromCurrentParent } from '../components/hierarchy/RemoveChildIDFromCurrentParent';
import { SetAndUpdateParent } from '../components/hierarchy/SetAndUpdateParent';
import { SetFirstChildID } from '../components/hierarchy/SetFirstChildID';
import { SetNextSiblingID } from '../components/hierarchy/SetNextSiblingID';
import { SetPreviousSiblingID } from '../components/hierarchy/SetPreviousSiblingID';

export function AddChildBefore <T extends IGameObject, C extends IGameObject> (before: T, child: C): C
{
    const beforeID = before.id;
    const childID = child.id;

    const parent = GetParentGameObject(beforeID);
    const parentID = parent.id;

    if (IsValidParent(parent, child))
    {
        RemoveChildIDFromCurrentParent(childID, parentID);

        const prevID = GetPreviousSiblingID(beforeID);

        if (prevID !== 0)
        {
            SetNextSiblingID(prevID, childID);
        }
        else
        {
            SetFirstChildID(parentID, childID);
        }

        SetPreviousSiblingID(beforeID, childID);

        SetNextSiblingID(childID, beforeID);
        SetPreviousSiblingID(childID, prevID);

        SetAndUpdateParent(parentID, childID);
    }

    return child;
}

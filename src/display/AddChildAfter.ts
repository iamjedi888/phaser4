import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetParentGameObject } from '../components/hierarchy/GetParentGameObject';
import { IGameObject } from '../gameobjects/IGameObject';
import { IsValidParent } from './IsValidParent';
import { LinkSiblings } from '../components/hierarchy/LinkSiblings';
import { RemoveChildIDFromCurrentParent } from '../components/hierarchy/RemoveChildIDFromCurrentParent';
import { SetAndUpdateParent } from '../components/hierarchy/SetAndUpdateParent';
import { SetLastChildID } from '../components/hierarchy/SetLastChildID';
import { SetNextSiblingID } from '../components/hierarchy/SetNextSiblingID';
import { SetPreviousSiblingID } from '../components/hierarchy/SetPreviousSiblingID';

export function AddChildAfter <T extends IGameObject, C extends IGameObject> (after: T, child: C): C
{
    const afterID = after.id;
    const childID = child.id;

    const parent = GetParentGameObject(afterID);
    const parentID = parent.id;

    if (IsValidParent(parent, child))
    {
        RemoveChildIDFromCurrentParent(childID, parentID);

        const nextID = GetNextSiblingID(afterID);

        if (nextID !== 0)
        {
            SetPreviousSiblingID(nextID, childID);
        }
        else
        {
            SetLastChildID(parentID, childID);
        }

        SetNextSiblingID(childID, nextID);

        LinkSiblings(afterID, childID);

        SetAndUpdateParent(parentID, childID);
    }

    return child;
}

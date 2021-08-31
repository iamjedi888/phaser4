import { DecreaseNumChildren } from '../components/hierarchy/DecreaseNumChildren';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { GetParentID } from '../components/hierarchy/GetParentID';
import { GetPreviousSiblingID } from '../components/hierarchy/GetPreviousSiblingID';
import { IGameObject } from '../gameobjects/IGameObject';
import { InsertChildIDAfter } from '../components/hierarchy/InsertChildIDAfter';
import { InsertChildIDBefore } from '../components/hierarchy/InsertChildIDBefore';
import { RemoveChildID } from '../components/hierarchy/RemoveChildID';

//  Replaces the `target` child with the `source` child.
//  Both children are removed from their parents.
//  Source is then moved to the parent of the target.
//  Target is left without a parent after this call.
//  If both children have the same parent, target is removed from the parent and source is moved to the position target previously held.
//  Target is returned.

export function ReplaceChild <T extends IGameObject, S extends IGameObject> (target: T, source: S): T
{
    const targetID = target.id;
    const sourceID = source.id;

    const targetParentID = GetParentID(targetID);
    const sourceParentID = GetParentID(sourceID);

    if (targetParentID === sourceParentID)
    {
        if (GetNumChildren(targetParentID) === 2)
        {
            //  This parent only has 2 children (target and source)
            RemoveChildID(targetID);
        }
        else
        {
            //  Remove target from parent and move source to targets position
            const targetNextID = GetNextSiblingID(targetID);
            const targetPrevID = GetPreviousSiblingID(targetID);

            RemoveChildID(targetID);
            RemoveChildID(sourceID);

            if (targetNextID)
            {
                InsertChildIDBefore(targetNextID, sourceID);
            }
            else
            {
                InsertChildIDAfter(targetPrevID, sourceID);
            }
        }

        DecreaseNumChildren(targetParentID);
    }
    else
    {
        const targetNextID = GetNextSiblingID(targetID);
        const targetPrevID = GetPreviousSiblingID(targetID);

        RemoveChildID(targetID);
        RemoveChildID(sourceID);

        DecreaseNumChildren(sourceParentID);

        if (targetNextID)
        {
            InsertChildIDBefore(targetNextID, sourceID);
        }
        else
        {
            InsertChildIDAfter(targetPrevID, sourceID);
        }
    }

    return target;
}

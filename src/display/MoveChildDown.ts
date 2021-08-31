import { GetPreviousSiblingID } from '../components/hierarchy/GetPreviousSiblingID';
import { IGameObject } from '../gameobjects/IGameObject';
import { InsertChildIDBefore } from '../components/hierarchy/InsertChildIDBefore';
import { RemoveChildID } from '../components/hierarchy/RemoveChildID';

export function MoveChildDown <T extends IGameObject> (child: T): T
{
    const childID = child.id;

    const prevID = GetPreviousSiblingID(childID);

    //  No previous sibling? Then we can't move down
    if (prevID)
    {
        RemoveChildID(childID);

        InsertChildIDBefore(prevID, childID);
    }

    return child;
}

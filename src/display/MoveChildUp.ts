import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { IGameObject } from '../gameobjects/IGameObject';
import { InsertChildIDAfter } from '../components/hierarchy/InsertChildIDAfter';
import { RemoveChildID } from '../components/hierarchy/RemoveChildID';

export function MoveChildUp <T extends IGameObject> (child: T): T
{
    const childID = child.id;

    const nextID = GetNextSiblingID(childID);

    //  No next sibling? Then we can't move up
    if (nextID)
    {
        RemoveChildID(childID);

        InsertChildIDAfter(nextID, childID);
    }

    return child;
}

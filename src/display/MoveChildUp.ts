import { GetSiblingIDs, GetWorldID } from '../components/hierarchy';

import { GetChildIndex } from './GetChildIndex';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';

export function MoveChildUp <T extends IGameObject> (child: T): T
{
    const childID = child.id;

    const currentIndex = GetChildIndex(child);

    const children = GetSiblingIDs(childID);

    const worldID = GetWorldID(childID);

    if (children.length > 1 && currentIndex < (children.length - 1))
    {
        const index2 = currentIndex + 1;
        const child2 = children[index2];

        children[currentIndex] = child2;
        children[index2] = childID;

        SetDirtyDisplayList(worldID);
    }

    return child;
}

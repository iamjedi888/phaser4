import { GetSiblingIDs, GetWorldID } from '../components/hierarchy';

import { GetChildIndex } from './GetChildIndex';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';

export function MoveChildTo <T extends IGameObject> (child: T, index: number): T
{
    const childID = child.id;

    const currentIndex = GetChildIndex(child);

    const children = GetSiblingIDs(childID);

    const worldID = GetWorldID(childID);

    if (currentIndex === -1 || index < 0 || index >= children.length)
    {
        throw new Error('Index out of bounds');
    }

    if (currentIndex !== index)
    {
        //  Remove
        children.splice(currentIndex, 1);

        //  Add in new location
        children.splice(index, 0, childID);

        SetDirtyDisplayList(worldID);
    }

    return child;
}

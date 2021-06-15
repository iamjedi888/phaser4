import { GetSiblingIDs, GetWorldID } from '../components/hierarchy';

import { GetChildIndex } from './GetChildIndex';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';

export function SendChildToBack <T extends IGameObject> (child: T): T
{
    const childID = child.id;

    const currentIndex = GetChildIndex(child);

    const children = GetSiblingIDs(childID);

    const worldID = GetWorldID(childID);

    if (currentIndex > 0)
    {
        children.splice(currentIndex, 1);
        children.unshift(childID);

        SetDirtyDisplayList(worldID);
    }

    return child;
}

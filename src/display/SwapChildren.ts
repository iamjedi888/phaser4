import { GetParentID, GetSiblingIDs } from '../components/hierarchy';

import { GetChildIndex } from './GetChildIndex';
import { IGameObject } from '../gameobjects/IGameObject';

export function SwapChildren <C extends IGameObject, T extends IGameObject> (child1: C, child2: T): void
{
    const child1ID = child1.id;
    const child2ID = child2.id;

    const parentID = GetParentID(child1ID);

    if (child2.hasParent(parentID))
    {
        const children = GetSiblingIDs(child1ID);

        const index1 = GetChildIndex(child1);
        const index2 = GetChildIndex(child2);

        children[index1] = child2ID;
        children[index2] = child1ID;
    }
}

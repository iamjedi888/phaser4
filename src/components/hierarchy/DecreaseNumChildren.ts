import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function DecreaseNumChildren (parentID: number, total: number = 1): void
{
    const data = GameObjectStore.ui32[parentID];

    data[HIERARCHY.NUM_CHILDREN] -= total;

    if (data[HIERARCHY.NUM_CHILDREN] < 0)
    {
        data[HIERARCHY.NUM_CHILDREN] = 0;
    }
}

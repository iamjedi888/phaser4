import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { IGameObject } from '../../gameobjects/IGameObject';

export function GetParentGameObject (id: number): IGameObject
{
    return GameObjectCache.get(GameObjectStore.ui32[id][HIERARCHY.PARENT]);
}

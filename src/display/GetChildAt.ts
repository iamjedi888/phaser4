import { GameObjectCache, GameObjectTree } from '../gameobjects';

import { IGameObject } from '../gameobjects/IGameObject';

export function GetChildAt <P extends IGameObject> (parent: P, index: number): IGameObject
{
    const children = GameObjectTree.get(parent.id);

    if (index < 0 || index > children.length)
    {
        throw new Error(`Index out of bounds: ${index}`);
    }

    return GameObjectCache.get(children[index]);
}

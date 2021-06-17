import { GameObjectCache, GameObjectTree } from '../gameobjects';

import { GetRandom } from '../utils/array';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetRandomChild <P extends IGameObject> (parent: P, startIndex: number = 0, length?: number): IGameObject
{
    const children = GameObjectTree.get(parent.id);

    if (children.length > 0)
    {
        const random = GetRandom(children, startIndex, length);

        return GameObjectCache.get(random);
    }
}

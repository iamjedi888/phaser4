import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetChildIDsFromParentID } from '../components/hierarchy/GetChildIDsFromParentID';
import { GetRandom } from '../utils/array/GetRandom';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetRandomChild <P extends IGameObject> (parent: P, startIndex: number = 0, length?: number): IGameObject
{
    const children = GetChildIDsFromParentID(parent.id);

    if (children.length > 0)
    {
        const random = GetRandom(children, startIndex, length);

        return GameObjectCache.get(random);
    }
}

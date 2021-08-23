import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetChildIDsFromParentID } from '../components/hierarchy/GetChildIDsFromParentID';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetChildAt <P extends IGameObject> (parent: P, index: number): IGameObject
{
    const children = GetChildIDsFromParentID(parent.id);

    if (index < 0 || index > children.length)
    {
        throw new Error(`Index out of bounds: ${index}`);
    }

    return GameObjectCache.get(children[index]);
}

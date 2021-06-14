import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { GameObjectTree } from '../../gameobjects/GameObjectTree';
import { IGameObject } from '../../gameobjects/IGameObject';

export function GetChildrenFromParentID (id: number): IGameObject[]
{
    const out: IGameObject[] = [];

    GameObjectTree.get(id).forEach(childID =>
    {
        out.push(GameObjectCache.get(childID));
    });

    return out;
}

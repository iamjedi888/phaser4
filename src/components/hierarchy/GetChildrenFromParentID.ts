import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { GetFirstChildID } from './GetFirstChildID';
import { GetNextSiblingID } from './GetNextSiblingID';
import { IGameObject } from '../../gameobjects/IGameObject';

export function GetChildrenFromParentID (id: number): IGameObject[]
{
    const out: IGameObject[] = [];

    let next = GetFirstChildID(id);

    while (next > 0)
    {
        out.push(GameObjectCache.get(next));

        next = GetNextSiblingID(next);
    }

    return out;
}

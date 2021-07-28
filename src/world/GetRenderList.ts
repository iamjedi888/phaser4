import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { IBaseWorld } from './IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetRenderList (world: IBaseWorld): IGameObject[]
{
    const list = world.renderList;

    const output = [];

    for (let i = 0; i < world.listLength; i += 2)
    {
        const eid = list[i];
        const type = list[i + 1];

        if (type === 0)
        {
            output.push(GameObjectCache.get(eid));
        }
    }

    return output;
}

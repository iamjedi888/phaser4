import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetChildIDsFromParent } from '../components/hierarchy/GetChildIDsFromParent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyWorldDisplayList } from '../components/dirty/SetDirtyWorldDisplayList';
import { UpdateChildIndexes } from '../components/hierarchy/UpdateChildIndexes';

export function RotateChildrenLeft <P extends IGameObject> (parent: P, total: number = 1): IGameObject | undefined
{
    const parentChildren = GetChildIDsFromParent(parent);

    let child;

    for (let i: number = 0; i < total; i++)
    {
        child = parentChildren.shift();

        parentChildren.push(child);
    }

    UpdateChildIndexes(parent.id);

    SetDirtyWorldDisplayList(parent.id);

    return GameObjectCache.get(child);
}

import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildrenBetween } from './RemoveChildrenBetween';
import { SetParent } from './SetParent';

export function ReparentChildren (parent: IGameObject, newParent: IGameObject, beginIndex: number = 0, endIndex?: number): IGameObject[]
{
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);

    SetParent(newParent, ...moved);

    moved.forEach(child =>
    {
        child.updateWorldTransform();
    });

    return moved;
}

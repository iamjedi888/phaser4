import { AddChild } from './AddChild';
import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildrenBetween } from './RemoveChildrenBetween';

export function ReparentChildren <P extends IGameObject, T extends IGameObject> (parent: P, newParent: T, beginIndex: number = 0, endIndex?: number): IGameObject[]
{
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);

    moved.forEach(child =>
    {
        AddChild(newParent, child);
    });

    return moved;
}

import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildrenBetween } from './RemoveChildrenBetween';
import { SetParent } from './SetParent';

export function ReparentChildren <P extends IGameObject, T extends IGameObject> (parent: P, newParent: T, beginIndex: number = 0, endIndex?: number): IGameObject[]
{
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);

    SetParent(newParent, ...moved);

    return moved;
}

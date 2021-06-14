import { AddChildAt } from './AddChildAt';
import { IGameObject } from '../gameobjects/IGameObject';

export function AddChildrenAt <P extends IGameObject, C extends IGameObject> (parent: P, index: number, ...children: C[]): C[]
{
    children.reverse().forEach(child =>
    {
        AddChildAt(parent, child, index);
    });

    return children;
}

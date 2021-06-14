import { AddChildAt } from './AddChildAt';
import { IGameObject } from '../gameobjects/IGameObject';

export function AddChildren <P extends IGameObject, C extends IGameObject> (parent: P, ...children: C[]): C[]
{
    children.forEach(child =>
    {
        AddChildAt(parent, child);
    });

    return children;
}

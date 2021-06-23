import { AddChildAt } from './AddChildAt';
import { IGameObject } from '../gameobjects/IGameObject';

export function AddChildren <P extends IGameObject> (parent: P, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        AddChildAt(parent, child);
    });

    return children;
}

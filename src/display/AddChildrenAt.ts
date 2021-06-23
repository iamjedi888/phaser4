import { AddChildAt } from './AddChildAt';
import { IGameObject } from '../gameobjects/IGameObject';

export function AddChildrenAt <P extends IGameObject> (parent: P, index: number, ...children: IGameObject[]): IGameObject[]
{
    children.reverse().forEach(child =>
    {
        AddChildAt(parent, child, index);
    });

    return children;
}

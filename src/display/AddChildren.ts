import { AddChild } from './AddChild';
import { IGameObject } from '../gameobjects/IGameObject';

export function AddChildren <P extends IGameObject> (parent: P, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        AddChild(parent, child);
    });

    return children;
}

import { AddChild } from './AddChild';
import { IGameObject } from '../gameobjects/IGameObject';

export function AddChildren <P extends IGameObject, C extends IGameObject> (parent: P, ...children: C[]): C[]
{
    children.forEach(child =>
    {
        AddChild(parent, child);
    });

    return children;
}

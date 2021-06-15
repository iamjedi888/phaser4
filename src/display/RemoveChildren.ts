import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChild } from './RemoveChild';

export function RemoveChildren <P extends IGameObject, C extends IGameObject> (parent: P, ...children: C[]): C[]
{
    children.forEach(child =>
    {
        RemoveChild(parent, child);
    });

    return children;
}

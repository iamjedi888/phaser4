import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChild } from './RemoveChild';

export function RemoveChildren <P extends IGameObject> (parent: P, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        RemoveChild(parent, child);
    });

    return children;
}

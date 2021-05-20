import { IGameObject } from '../gameobjects/IGameObject';

export function AddPosition (x: number, y: number, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.x += x;
        child.y += y;
    });

    return children;
}

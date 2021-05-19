import { IGameObject } from '../gameobjects/IGameObject';

export function AddSkew (skewX: number, skewY: number, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.skewX += skewX;
        child.skewY += skewY;
    });

    return children;
}

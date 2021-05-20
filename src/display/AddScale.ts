import { IGameObject } from '../gameobjects/IGameObject';

export function AddScale (scaleX: number, scaleY: number, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.scaleX += scaleX;
        child.scaleY += scaleY;
    });

    return children;
}

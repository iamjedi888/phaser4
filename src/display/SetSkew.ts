import { IGameObject } from '../gameobjects/IGameObject';

export function SetSkew (skewX: number, skewY: number, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.setSkew(skewX, skewY);
    });

    return children;
}

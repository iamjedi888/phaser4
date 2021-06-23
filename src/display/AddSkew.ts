import { IContainer } from '../gameobjects/container/IContainer';

export function AddSkew (skewX: number, skewY: number, ...children: IContainer[]): IContainer[]
{
    children.forEach(child =>
    {
        child.skew.x += skewX;
        child.skew.y += skewY;
    });

    return children;
}

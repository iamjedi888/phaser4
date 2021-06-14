import { IContainer } from '../gameobjects/container/IContainer';

export function AddSkew <T extends IContainer> (skewX: number, skewY: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.skew.x += skewX;
        child.skew.y += skewY;
    });

    return children;
}

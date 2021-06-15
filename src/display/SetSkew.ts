import { IContainer } from '../gameobjects/container/IContainer';

export function SetSkew <T extends IContainer> (skewX: number, skewY: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.skew.set(skewX, skewY);
    });

    return children;
}

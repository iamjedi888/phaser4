import { IContainer } from '../gameobjects/container/IContainer';

export function AddPosition <T extends IContainer> (x: number, y: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.x += x;
        child.y += y;
    });

    return children;
}

import { IContainer } from '../gameobjects/container/IContainer';

export function AddPosition (x: number, y: number, ...children: IContainer[]): IContainer[]
{
    children.forEach(child =>
    {
        child.x += x;
        child.y += y;
    });

    return children;
}

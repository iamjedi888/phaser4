import { IContainer } from '../gameobjects/container/IContainer';

export function SetPosition (x: number, y: number, ...children: IContainer[]): IContainer[]
{
    children.forEach(child =>
    {
        child.position.set(x, y);
    });

    return children;
}

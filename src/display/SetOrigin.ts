import { IContainer } from '../gameobjects/container/IContainer';

export function SetOrigin (originX: number, originY: number, ...children: IContainer[]): IContainer[]
{
    children.forEach(child =>
    {
        child.origin.set(originX, originY);
    });

    return children;
}

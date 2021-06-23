import { IContainer } from '../gameobjects/container/IContainer';

export function SetRotation (rotation: number, ...children: IContainer[]): IContainer[]
{
    children.forEach(child =>
    {
        child.rotation = rotation;
    });

    return children;
}

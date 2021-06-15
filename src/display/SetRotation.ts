import { IContainer } from '../gameobjects/container/IContainer';

export function SetRotation <T extends IContainer> (rotation: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.rotation = rotation;
    });

    return children;
}

import { IContainer } from '../gameobjects/container/IContainer';

export function AddRotation (rotation: number, ...children: IContainer[]): IContainer[]
{
    children.forEach(child =>
    {
        child.rotation += rotation;
    });

    return children;
}

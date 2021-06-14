import { IContainer } from '../gameobjects/container/IContainer';

export function AddScale <T extends IContainer> (scaleX: number, scaleY: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.scale.x += scaleX;
        child.scale.y += scaleY;
    });

    return children;
}

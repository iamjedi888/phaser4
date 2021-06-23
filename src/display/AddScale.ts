import { IContainer } from '../gameobjects/container/IContainer';

export function AddScale (scaleX: number, scaleY: number, ...children: IContainer[]): IContainer[]
{
    children.forEach(child =>
    {
        child.scale.x += scaleX;
        child.scale.y += scaleY;
    });

    return children;
}

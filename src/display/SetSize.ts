import { IGameObject } from '../gameobjects/IGameObject';

export function SetSize (width: number, height: number, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.setSize(width, height);
    });

    return children;
}

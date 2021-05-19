import { IGameObject } from '../gameobjects/IGameObject';

export function SetRotation (rotation: number, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.rotation = rotation;
    });

    return children;
}

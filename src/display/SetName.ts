import { IGameObject } from '../gameobjects/IGameObject';

export function SetName (name: string, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.name = name;
    });

    return children;
}

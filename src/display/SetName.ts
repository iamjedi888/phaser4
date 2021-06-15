import { IGameObject } from '../gameobjects/IGameObject';

export function SetName <T extends IGameObject> (name: string, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.name = name;
    });

    return children;
}

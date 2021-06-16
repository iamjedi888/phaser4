import { IGameObject } from '../gameobjects/IGameObject';

export function SetValue <T extends IGameObject> (property: string | symbol, value: never, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        if (property in child)
        {
            child[property] = value;
        }
    });

    return children;
}

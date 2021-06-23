import { IGameObject } from '../gameobjects/IGameObject';

export function SetValue (property: string | symbol, value: never, ...children: IGameObject[]): IGameObject[]
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

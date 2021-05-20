import { IGameObject } from '../gameobjects/IGameObject';

export function SetPosition (x: number, y: number, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.setPosition(x, y);
    });

    return children;
}

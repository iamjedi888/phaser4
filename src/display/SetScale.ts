import { IGameObject } from '../gameobjects/IGameObject';

export function SetScale (scaleX: number, scaleY: number, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.setScale(scaleX, scaleY);
    });

    return children;
}

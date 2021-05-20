import { IGameObject } from '../gameobjects/IGameObject';

export function SetOrigin (originX: number, originY: number, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.setOrigin(originX, originY);
    });

    return children;
}

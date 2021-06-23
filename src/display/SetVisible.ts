import { IGameObject } from '../gameobjects/IGameObject';

export function SetVisible (visible: boolean, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        child.visible = visible;
    });

    return children;
}

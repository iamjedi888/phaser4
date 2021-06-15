import { IGameObject } from '../gameobjects/IGameObject';

export function SetVisible <T extends IGameObject> (visible: boolean, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.visible = visible;
    });

    return children;
}

import { IGameObject } from '../gameobjects/IGameObject';

export function SetInteractive <T extends IGameObject> (...children: T[]): T[]
{
    children.forEach(child =>
    {
        // child.input.enabled = true;
    });

    return children;
}

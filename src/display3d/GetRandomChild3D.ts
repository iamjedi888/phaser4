import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function GetRandomChild3D (parent: IGameObject3D, startIndex: number = 0, length?: number): IGameObject3D
{
    const children = parent.children;

    if (!length)
    {
        length = children.length;
    }

    const randomIndex = startIndex + Math.floor(Math.random() * length);

    return children[randomIndex];
}

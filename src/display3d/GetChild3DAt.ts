import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function GetChild3DAt (parent: IGameObject3D, index: number): IGameObject3D
{
    const children = parent.children;

    if (index < 0 || index > children.length)
    {
        throw new Error(`Index out of bounds: ${index}`);
    }

    return children[index];
}

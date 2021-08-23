import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function GetParents3D (child: IGameObject3D): IGameObject3D[]
{
    const parents: IGameObject3D[] = [];

    while (child.parent)
    {
        parents.push(child.parent);

        child = child.parent;
    }

    return parents;
}

import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function GetChild3DIndex (parent: IGameObject3D, child: IGameObject3D): number
{
    return parent.children.indexOf(child);
}

import { AddChild3D } from './AddChild3D';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function AddChildren3D (parent: IGameObject3D, ...children: IGameObject3D[]): IGameObject3D[]
{
    children.forEach(child =>
    {
        AddChild3D(parent, child);
    });

    return children;
}

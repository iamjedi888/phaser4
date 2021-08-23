import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { RemoveChild3D } from './RemoveChild3D';

export function RemoveChildren3D (parent: IGameObject3D, ...children: IGameObject3D[]): IGameObject3D[]
{
    children.forEach(child =>
    {
        RemoveChild3D(parent, child);
    });

    return children;
}

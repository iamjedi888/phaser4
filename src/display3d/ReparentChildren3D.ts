import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { RemoveChildren3DBetween } from './RemoveChildren3DBetween';
import { SetParent3D } from './SetParent3D';

export function ReparentChildren3D (parent: IGameObject3D, newParent: IGameObject3D, beginIndex: number = 0, endIndex?: number): IGameObject3D[]
{
    const moved = RemoveChildren3DBetween(parent, beginIndex, endIndex);

    SetParent3D(newParent, ...moved);

    moved.forEach(child =>
    {
        // child.transform.updateWorld();
    });

    return moved;
}

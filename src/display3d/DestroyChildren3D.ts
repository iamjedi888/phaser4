import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { RemoveChildren3DBetween } from './RemoveChildren3DBetween';

export function DestroyChildren3D (parent: IGameObject3D, beginIndex: number = 0, endIndex?: number): void
{
    const removed = RemoveChildren3DBetween(parent, beginIndex, endIndex);

    removed.forEach(child =>
    {
        child.destroy();
    });
}

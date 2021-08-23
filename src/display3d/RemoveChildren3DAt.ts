import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { RemoveChild3DAt } from './RemoveChild3DAt';

export function RemoveChildren3DAt (parent: IGameObject3D, ...index: number[]): IGameObject3D[]
{
    const removed: IGameObject3D[] = [];

    //  Sort into numeric order
    index.sort((a, b) => a - b);

    //  Work through the array in reverse
    index.reverse().forEach(i =>
    {
        const child = RemoveChild3DAt(parent, i);

        if (child)
        {
            removed.push(child);
        }
    });

    return removed;
}

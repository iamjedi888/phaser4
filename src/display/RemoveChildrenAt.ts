import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChildAt } from './RemoveChildAt';

export function RemoveChildrenAt <P extends IGameObject> (parent: P, ...index: number[]): IGameObject[]
{
    const removed: IGameObject[] = [];

    //  Sort into numeric order
    index.sort((a, b) => a - b);

    //  Work through the array in reverse
    index.reverse().forEach(i =>
    {
        const child = RemoveChildAt(parent, i);

        if (child)
        {
            removed.push(child);
        }
    });

    return removed;
}

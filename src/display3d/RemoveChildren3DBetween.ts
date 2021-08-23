import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function RemoveChildren3DBetween (parent: IGameObject3D, beginIndex: number = 0, endIndex?: number): IGameObject3D[]
{
    const children = parent.children;

    if (endIndex === undefined)
    {
        endIndex = children.length;
    }

    const range = endIndex - beginIndex;

    if (range > 0 && range <= endIndex)
    {
        const removed = children.splice(beginIndex, range);

        removed.forEach(child =>
        {
            child.parent = null;
        });

        return removed;
    }
    else
    {
        return [];
    }
}

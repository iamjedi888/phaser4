import { GetChildrenFromParentID } from '../components/hierarchy';
import { IGameObject } from '../gameobjects/IGameObject';

export function RemoveChildrenBetween <P extends IGameObject> (parent: P, beginIndex: number = 0, endIndex?: number): IGameObject[]
{
    const children = GetChildrenFromParentID(parent.id);

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

import { ClearWorldAndParentID } from '../components/hierarchy/ClearWorldAndParentID';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetChildIDsFromParent } from '../components/hierarchy/GetChildIDsFromParent';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { IGameObject } from '../gameobjects/IGameObject';
import { RelinkChildren } from '../components/hierarchy/RelinkChildren';

export function RemoveChildrenBetween <P extends IGameObject> (parent: P, beginIndex: number = 0, endIndex?: number): IGameObject[]
{
    const parentID = parent.id;

    if (endIndex === undefined)
    {
        endIndex = GetNumChildren(parentID);
    }

    const range = endIndex - beginIndex;

    if (range > 0 && range <= endIndex)
    {
        const children = GetChildIDsFromParent(parent);

        const removed = children.splice(beginIndex, range);

        removed.forEach(childID =>
        {
            ClearWorldAndParentID(childID);
        });

        RelinkChildren(parentID, children);

        return removed.map(id => GameObjectCache.get(id));
    }
    else
    {
        return [];
    }
}

import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetChildIDsFromParentID } from '../components/hierarchy/GetChildIDsFromParentID';
import { GetWorldID } from '../components/hierarchy/GetWorldID';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';
import { SetIndex } from '../components/hierarchy/SetIndex';

//  Property must be numeric (x, y, scale, etc)
export function SortChildren (parentID: number, property: string): void
{
    const children = GetChildIDsFromParentID(parentID);

    children.sort((a: number, b: number) =>
    {
        const childA = GameObjectCache.get(a);
        const childB = GameObjectCache.get(b);

        return childA[property] - childB[property];
    });

    children.forEach((childID: number, index: number) =>
    {
        SetIndex(childID, index);
    });

    const worldID = GetWorldID(parentID);

    if (worldID)
    {
        SetDirtyDisplayList(worldID);
    }
}

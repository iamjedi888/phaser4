import { ClearWorldAndParentID } from '../components/hierarchy/ClearWorldAndParentID';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { IGameObject } from '../gameobjects/IGameObject';
import { UpdateChildIndexes } from '../components/hierarchy/UpdateChildIndexes';

export function RemoveChildAt <T extends IGameObject> (parent: T, index: number): IGameObject | undefined
{
    const parentID = parent.id;

    // const children = GameObjectTree.get(parentID);

    if (index >= 0 && index < children.length)
    {
        const removedID = children.splice(index, 1)[0];

        if (removedID)
        {
            ClearWorldAndParentID(removedID);

            UpdateChildIndexes(parentID);

            //  Emit remove event?

            return GameObjectCache.get(removedID);
        }
    }
}

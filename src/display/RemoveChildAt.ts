import { HierarchyComponent, UpdateNumChildren } from '../components/hierarchy';

import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';

export function RemoveChildAt <T extends IGameObject> (parent: T, index: number): IGameObject | undefined
{
    const children = GameObjectTree.get(parent.id);

    if (index >= 0 && index < children.length)
    {
        const removedID = children.splice(index, 1)[0];

        if (removedID)
        {
            const worldID = HierarchyComponent.worldID[removedID];

            SetDirtyDisplayList(worldID);

            HierarchyComponent.worldID[removedID] = 0;
            HierarchyComponent.parentID[removedID] = 0;

            //  Emit remove event?

            UpdateNumChildren(parent.id);

            return GameObjectCache.get(removedID);
        }
    }
}

import { GetWorldID, SetParentID, SetWorldAndParentID, UpdateNumChildren } from '../components/hierarchy';

import { GameObjectCache } from '../gameobjects';
import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IsValidParent } from './IsValidParent';
import { RemoveChild } from './RemoveChild';
import { SetDirtyDisplayList } from '../components/dirty';
import { SetWorld } from './SetWorld';

export function AddChild <P extends IGameObject, C extends IGameObject> (parent: P, child: C): C
{
    if (IsValidParent(parent, child))
    {
        const childID = child.id;
        const parentID = parent.id;
        const worldID = GetWorldID(parentID);
        const world = GameObjectCache.get(worldID) as IBaseWorld;

        RemoveChild(child.getParent(), child);

        GameObjectTree.get(parentID).push(childID);

        // SetWorldAndParentID(childID, worldID, parentID);

        SetParentID(childID, parentID);

        SetWorld(world, child);

        SetDirtyDisplayList(worldID);

        //  Emit add event?

        UpdateNumChildren(parentID);
    }

    return child;
}

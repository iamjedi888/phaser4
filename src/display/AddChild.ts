import { GetWorldID, HierarchyComponent, SetWorldAndParentID, UpdateNumChildren } from '../components/hierarchy';

import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { IGameObject } from '../gameobjects/IGameObject';
import { IsValidParent } from './IsValidParent';
import { RemoveChild } from './RemoveChild';
import { SetDirtyDisplayList } from '../components/dirty';

export function AddChild <P extends IGameObject, C extends IGameObject> (parent: P, child: C): C
{
    const childID = child.id;
    const parentID = parent.id;
    const worldID = GetWorldID(parentID);

    if (IsValidParent(parent, child))
    {
        RemoveChild(child.getParent(), child);

        GameObjectTree.get(parentID).push(childID);

        SetWorldAndParentID(childID, worldID, parentID);

        SetDirtyDisplayList(worldID);

        //  Emit add event?

        UpdateNumChildren(parentID);
    }

    return child;
}

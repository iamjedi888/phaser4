import { HierarchyComponent, UpdateNumChildren } from '../components/hierarchy';

import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { IGameObject } from '../gameobjects/IGameObject';
import { IsValidParent } from './IsValidParent';
import { RemoveChild } from './RemoveChild';

export function AddChild <T extends IGameObject> (parent: T, child: T): T
{
    const childID = child.id;
    const parentID = parent.id;

    if (IsValidParent(parent, child))
    {
        RemoveChild(child.getParent(), child);

        GameObjectTree.get(parentID).push(childID);

        //  SetParent
        HierarchyComponent.parentID[childID] = parentID;

        //  Emit add event?

        UpdateNumChildren(parentID);
    }

    return child;
}

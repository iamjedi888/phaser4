import { GetWorldFromParentID, SetParentID } from '../components/hierarchy';

import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { IGameObject } from '../gameobjects/IGameObject';
import { IsValidParent } from './IsValidParent';
import { RemoveChild } from './RemoveChild';
import { SetWorld } from './SetWorld';

export function AddChildAt <P extends IGameObject, C extends IGameObject> (parent: P, child: C, index: number = -1): C
{
    if (IsValidParent(parent, child))
    {
        const childID = child.id;
        const parentID = parent.id;
        const world = GetWorldFromParentID(parentID);

        const children = GameObjectTree.get(parentID);

        if (index === -1)
        {
            index = children.length;
        }

        if (index >= 0 && index <= children.length && world)
        {
            RemoveChild(child.getParent(), child);

            //  Always modify the array before calling SetParentID
            children.splice(index, 0, childID);

            SetWorld(world, child);

            SetParentID(childID, parentID);
        }
    }

    return child;
}

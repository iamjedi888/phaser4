import { GameObjectTree } from '../gameobjects/GameObjectTree';
import { GetWorldFromParentID } from '../components/hierarchy/GetWorldFromParentID';
import { IGameObject } from '../gameobjects/IGameObject';
import { InvalidateTransform2DComponent } from '../components/transform/InvalidateTransform2DComponent';
import { IsValidParent } from './IsValidParent';
import { RemoveChild } from './RemoveChild';
import { SetDirtyParents } from '../components/dirty/SetDirtyParents';
import { SetParentID } from '../components/hierarchy/SetParentID';
import { SetWorld } from './SetWorld';
import { UpdateIndexes } from '../components/hierarchy/UpdateIndexes';

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

        if (index >= 0 && index <= children.length)
        {
            RemoveChild(child.getParent(), child);

            //  Always modify the array before calling SetParentID
            children.splice(index, 0, childID);

            InvalidateTransform2DComponent(child.id);

            if (world)
            {
                SetWorld(world, child);
            }

            SetParentID(childID, parentID);

            UpdateIndexes(childID);

            SetDirtyParents(childID);
        }
    }

    return child;
}

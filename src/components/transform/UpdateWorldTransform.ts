import { CopyLocalToWorld } from './CopyLocalToWorld';
import { CopyWorldToWorld } from './CopyWorldToWorld';
import { GameObjectWorld } from '../../GameObjectWorld';
import { GetParentID } from '../hierarchy/GetParentID';
import { MultiplyLocalWithWorld } from './MultiplyLocalWithWorld';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function UpdateWorldTransform (id: number): void
{
    const parentID = GetParentID(id);

    if (!WillTransformChildren(id))
    {
        //  If the child doesn't transform its children, we copy the parent world to the child world directly
        //  TODO - Check this branch is correct
        CopyWorldToWorld(parentID, id);
    }
    else
    {
        //  Multiplay the child local transform with the parent world transform and store in child world transform
        MultiplyLocalWithWorld(parentID, id);
    }

    /*
    if (!hasComponent(GameObjectWorld, Transform2DComponent, parentID))
    {
        //  If the parent doesn't have a transform component, we copy the local to the world in the child
        CopyLocalToWorld(id, id);
    }
    else if (!WillTransformChildren(id))
    {
        //  If the child doesn't transform its children, we copy the parent world to the child world directly
        //  TODO - Check this branch is correct
        CopyWorldToWorld(parentID, id);
    }
    else
    {
        //  Multiplay the child local transform with the parent world transform and store in child world transform
        MultiplyLocalWithWorld(parentID, id);
    }
    */
}

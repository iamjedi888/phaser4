import { ClearDirtyTransform } from '../dirty/ClearDirtyTransform';
import { CopyLocalToWorld } from './CopyLocalToWorld';
import { CopyWorldToWorld } from './CopyWorldToWorld';
import { GameObjectWorld } from '../../GameObjectWorld';
import { GetParentID } from '../hierarchy/GetParentID';
import { MultiplyLocalWithWorld } from './MultiplyLocalWithWorld';
import { Transform2DComponent } from './Transform2DComponent';
import { WillTransformChildren } from '../permissions/WillTransformChildren';
import { hasComponent } from 'bitecs';

export function UpdateWorldTransform (id: number): void
{
    const parentID = GetParentID(id);

    if (!hasComponent(GameObjectWorld, Transform2DComponent, parentID))
    {
        CopyLocalToWorld(id, id);
    }
    else if (!WillTransformChildren(id))
    {
        CopyWorldToWorld(parentID, id);
    }
    else
    {
        MultiplyLocalWithWorld(parentID, id);
    }

    ClearDirtyTransform(id);
}

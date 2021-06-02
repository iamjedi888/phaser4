import { CopyLocalToWorld } from './CopyLocalToWorld';
import { CopyWorldToWorld } from './CopyWorldToWorld';
import { GetParentID } from '../hierarchy';
import { MultiplyLocalWithWorld } from './MultiplyLocalWithWorld';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function UpdateWorldTransform (id: number): void
{
    const parentID = GetParentID(id);

    if (parentID === 0)
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
}

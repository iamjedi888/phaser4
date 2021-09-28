import { IsFixedTransform } from './IsFixedTransform';
import { SetDirtyWorldTransform } from '../dirty/SetDirtyWorldTransform';
import { UpdateLocalTransform } from './UpdateLocalTransform';
import { UpdateQuadBounds } from './UpdateQuadBounds';
import { UpdateWorldTransform } from './UpdateWorldTransform';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function UpdateTransforms (id: number, parentID: number, updateWorld: boolean, cx: number, cy: number, cright: number, cbottom: number): void
{
    if (updateWorld || UpdateLocalTransform(id))
    {
        UpdateWorldTransform(id, parentID);
    }

    if (WillTransformChildren(id))
    {
        SetDirtyWorldTransform(id);
    }

    if (!IsFixedTransform(id))
    {
        UpdateQuadBounds(id, cx, cy, cright, cbottom);
    }
}

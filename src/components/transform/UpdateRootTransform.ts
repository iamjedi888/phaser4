import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { GetParentID } from '../hierarchy/GetParentID';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function UpdateRootTransform (id: number): void
{
    let currentParent = GetParentID(id);

    let isRootTransform = true;

    while (currentParent)
    {
        if (WillTransformChildren(currentParent))
        {
            isRootTransform = false;
            break;
        }

        currentParent = GetParentID(currentParent);
    }

    Transform2DComponent.data[id][TRANSFORM.IS_ROOT] = Number(isRootTransform);
}

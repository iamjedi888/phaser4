import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

import { GetParentID } from '../hierarchy/GetParentID';
import { GetWorldID } from '../hierarchy/GetWorldID';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function UpdateRootTransform (id: number): void
{
    const worldID = GetWorldID(id);
    let currentParent = GetParentID(id);

    let isRootTransform = true;

    while (currentParent && currentParent !== worldID)
    {
        if (WillTransformChildren(currentParent))
        {
            isRootTransform = false;
            break;
        }

        currentParent = GetParentID(currentParent);
    }

    GameObjectStore.f32[id][TRANSFORM.IS_ROOT] = Number(isRootTransform);
}

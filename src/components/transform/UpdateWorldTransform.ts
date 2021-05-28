import { CopyLocalToWorld } from './CopyLocalToWorld';
import { CopyWorldToWorld } from './CopyWorldToWorld';
import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { MultiplyLocalWithWorld } from './MultiplyLocalWithWorld';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function UpdateWorldTransform (id: number): void
{
    const gameObject = GameObjectCache.get(id);
    const parent = gameObject.getParent();

    if (!parent)
    {
        CopyLocalToWorld(id, id);
    }
    else if (!WillTransformChildren(id))
    {
        CopyWorldToWorld(parent.id, id);
    }
    else
    {
        MultiplyLocalWithWorld(parent.id, id);
    }
}

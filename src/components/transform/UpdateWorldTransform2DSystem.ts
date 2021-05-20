import { Changed, defineQuery, defineSystem } from 'bitecs';

import { CopyLocalToWorld } from './CopyLocalToWorld';
import { CopyWorldToWorld } from './CopyWorldToWorld';
import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { LocalMatrix2DComponent } from './LocalMatrix2DComponent';
import { MultiplyLocalWithWorld } from './MultiplyLocalWithWorld';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

const changedWorldTransformQuery = defineQuery([ Changed(LocalMatrix2DComponent) ]);

const updateWorldTransformSystem = defineSystem(world =>
{
    const entities = changedWorldTransformQuery(world);

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];
        const gameObject = GameObjectCache.get(id);
        const parent = gameObject.parent;

        if (!parent)
        {
            //  copy local to world
            CopyLocalToWorld(id, id);
        }
        else if (!WillTransformChildren(id))
        {
            //  copy parent world to world
            CopyWorldToWorld(parent.id, id);
        }
        else
        {
            // multiply parent world with local
            MultiplyLocalWithWorld(parent.id, id);
        }
    }
});

export const UpdateWorldTransform2DSystem = updateWorldTransformSystem;

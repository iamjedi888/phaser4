import { DepthFirstSearchFromParentID } from './DepthFirstSearchFromParentID';
import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../../GameObjectWorld';
import { GetWorldFromParentID } from './GetWorldFromParentID';
import { SetWorldID } from './SetWorldID';
import { removeComponent } from 'bitecs';

export function RemoveWorldTag (id: number): void
{
    const world = GetWorldFromParentID(id);

    const children = DepthFirstSearchFromParentID(id, false);

    children.map(childID =>
    {
        removeComponent(GameObjectWorld, world.tag, childID);

        const gameObject = GameObjectCache.get(childID);

        if (gameObject)
        {
            gameObject.onRemovedFromWorld(world);
        }

        SetWorldID(childID, 0);
    });
}

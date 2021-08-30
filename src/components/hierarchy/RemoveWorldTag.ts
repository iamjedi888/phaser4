import { DepthFirstSearchFromParentID } from './DepthFirstSearchFromParentID';
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

        SetWorldID(childID, 0);
    });
}

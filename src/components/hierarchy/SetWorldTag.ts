import { DepthFirstSearchFromParentID } from './DepthFirstSearchFromParentID';
import { GameObjectWorld } from '../../GameObjectWorld';
import { IBaseWorld } from '../../world/IBaseWorld';
import { SetWorldID } from './SetWorldID';
import { addComponent } from 'bitecs';

export function SetWorldTag <W extends IBaseWorld> (world: W, id: number): void
{
    const worldID = world.id;
    const worldTag = world.tag;

    const children = DepthFirstSearchFromParentID(id, false);

    children.map(childID =>
    {
        addComponent(GameObjectWorld, worldTag, childID);

        SetWorldID(childID, worldID);
    });

    world.updateDisplayList = true;
}

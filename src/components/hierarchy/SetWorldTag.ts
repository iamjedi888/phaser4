import { DepthFirstSearchFromParentID } from './DepthFirstSearchFromParentID';
import { IBaseWorld } from '../../world/IBaseWorld';
import { SetDirtyChildColor } from '../dirty/SetDirtyChildColor';
import { SetDirtyChildTransform } from '../dirty/SetDirtyChildTransform';
import { SetDirtyDisplayList } from '../dirty/SetDirtyDisplayList';
import { SetWorldID } from './SetWorldID';

export function SetWorldTag <W extends IBaseWorld> (world: W, id: number): void
{
    const list = world.children;
    const worldID = world.id;

    const children = DepthFirstSearchFromParentID(id, false);

    children.map(childID =>
    {
        SetWorldID(childID, worldID);

        list.push(childID);
    });

    SetDirtyDisplayList(worldID);
    SetDirtyChildColor(worldID);
    SetDirtyChildTransform(worldID);
}

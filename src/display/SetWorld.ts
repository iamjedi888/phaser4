import { ClearWorld } from './ClearWorld';
import { DepthFirstSearchFromParentID } from '../components/hierarchy/DepthFirstSearchFromParentID';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetWorldID } from '../components/hierarchy/GetWorldID';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';
import { SetWorldID } from '../components/hierarchy/SetWorldID';
import { addComponent } from 'bitecs';

export function SetWorld <W extends IBaseWorld> (world: W, ...entries: IGameObject[]): IGameObject[]
{
    const worldID = world.id;
    const worldTag = world.tag;

    entries.forEach(entry =>
    {
        const children = DepthFirstSearchFromParentID(entry.id, false);

        children.map(id =>
        {
            const currentWorldID = GetWorldID(id);

            if (currentWorldID > 0 && currentWorldID !== worldID)
            {
                //  Remove from existing world
                ClearWorld(id);
            }

            if (currentWorldID !== worldID)
            {
                addComponent(GameObjectWorld, worldTag, id);

                SetWorldID(id, worldID);
            }
        });
    });

    SetDirtyDisplayList(worldID);

    return entries;
}

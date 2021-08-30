import { ClearWorld } from './ClearWorld';
import { DepthFirstSearchFromParentID } from '../components/hierarchy/DepthFirstSearchFromParentID';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetWorldID } from '../components/hierarchy/GetWorldID';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyChildColor } from '../components/dirty/SetDirtyChildColor';
import { SetDirtyChildTransform } from '../components/dirty/SetDirtyChildTransform';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';
import { SetWorldID } from '../components/hierarchy/SetWorldID';
import { addComponent } from 'bitecs';

export function SetWorld <W extends IBaseWorld> (world: W, ...entries: IGameObject[]): IGameObject[]
{
    const worldID = world.id;
    const worldTag = world.tag;

    let setNewWorld = false;

    entries.forEach(entry =>
    {
        const currentWorldID = GetWorldID(entry.id);

        const children = DepthFirstSearchFromParentID(entry.id, false);

        children.map(id =>
        {
            if (currentWorldID !== worldID)
            {
                if (currentWorldID > 0)
                {
                    ClearWorld(id);
                }

                addComponent(GameObjectWorld, worldTag, id);

                SetWorldID(id, worldID);

                setNewWorld = true;
            }
        });
    });

    if (setNewWorld)
    {
        SetDirtyDisplayList(worldID);
        SetDirtyChildColor(worldID);
        SetDirtyChildTransform(worldID);
    }

    return entries;
}

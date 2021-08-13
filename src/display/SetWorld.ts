import { ClearWorld } from './ClearWorld';
import { DepthFirstSearchFromParentID } from '../components/hierarchy/DepthFirstSearchFromParentID';
import { GameObjectWorld } from '../GameObjectWorld';
import { HierarchyComponent } from '../components/hierarchy/HierarchyComponent';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';
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
            const currentWorldID = HierarchyComponent.worldID[id];

            if (currentWorldID > 0 && currentWorldID !== worldID)
            {
                //  Remove from existing world
                ClearWorld(id);
            }

            if (currentWorldID !== worldID)
            {
                addComponent(GameObjectWorld, worldTag, id);

                HierarchyComponent.worldID[id] = worldID;
            }
        });
    });

    SetDirtyDisplayList(worldID);

    return entries;
}

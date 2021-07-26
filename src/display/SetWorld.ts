import { AddedToWorldEvent } from '../gameobjects/events/AddedToWorldEvent';
import { DepthFirstSearchFromParentID } from '../components/hierarchy/DepthFirstSearchFromParentID';
import { Emit } from '../events/Emit';
import { GameObjectWorld } from '../GameObjectWorld';
import { HierarchyComponent } from '../components/hierarchy/HierarchyComponent';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { RemovedFromWorldEvent } from '../gameobjects/events/RemovedFromWorldEvent';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';
import { addComponent } from 'bitecs';

export function SetWorld <W extends IBaseWorld> (world: W, ...entries: IGameObject[]): IGameObject[]
{
    const worldID = world.id;
    const worldTag = world.tag;

    entries.forEach(entry =>
    {
        // if (entry.world)
        // {
        //     Emit(entry.world, RemovedFromWorldEvent, entry, entry.world);
        //     Emit(entry, RemovedFromWorldEvent, entry, entry.world);
        // }

        addComponent(GameObjectWorld, worldTag, entry.id);

        HierarchyComponent.worldID[entry.id] = worldID;

        // Emit(world, AddedToWorldEvent, entry, world);
        // Emit(entry, AddedToWorldEvent, entry, world);

        //  Now set the World on any children
        const children = DepthFirstSearchFromParentID(entry.id);

        children.map(id =>
        {
            addComponent(GameObjectWorld, worldTag, id);

            HierarchyComponent.worldID[id] = worldID;
        });
    });

    SetDirtyDisplayList(worldID);

    return entries;
}

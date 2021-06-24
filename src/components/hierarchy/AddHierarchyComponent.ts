import { GameObjectWorld } from '../../GameObjectWorld';
import { HierarchyComponent } from './HierarchyComponent';
import { addComponent } from 'bitecs';

export function AddHierarchyComponent (id: number): void
{
    addComponent(GameObjectWorld, HierarchyComponent, id);

    //  renderType defaults to 0 and postRenderType to 1
    HierarchyComponent.postRenderType[id] = 1;
}

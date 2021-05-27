import { GameObjectWorld } from '../GameObjectWorld';
import { HierarchyComponent } from './HierarchyComponent';
import { addComponent } from 'bitecs';

export function AddHierarchyComponent (id: number): void
{
    addComponent(GameObjectWorld, HierarchyComponent, id);
}

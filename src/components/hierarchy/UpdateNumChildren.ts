import { GameObjectTree } from '../../gameobjects/GameObjectTree';
import { HierarchyComponent } from './HierarchyComponent';

export function UpdateNumChildren (id: number): void
{
    HierarchyComponent.numChildren[id] = GameObjectTree.get(id).length;
}

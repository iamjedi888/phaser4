import { GameObjectTree } from '../../gameobjects/GameObjectTree';
import { HierarchyComponent } from './HierarchyComponent';

export function SetNumChildren (id: number): void
{
    HierarchyComponent.numChildren[id] = GameObjectTree.get(id).length;
}

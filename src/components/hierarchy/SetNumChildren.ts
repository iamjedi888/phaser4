import { GameObjectTree } from '../../gameobjects/GameObjectTree';
import { HierarchyComponent } from './HierarchyComponent';

export function SetNumChildren (parentID: number, total: number): void
{
    // HierarchyComponent.numChildren[id] = GameObjectTree.get(id).length;
    HierarchyComponent.numChildren[parentID] = total;
}

import { GameObjectComponent } from './GameObjectComponent';
import { GameObjectTree } from '../../gameobjects/GameObjectTree';

export function SetNumChildren (id: number): void
{
    GameObjectComponent.numChildren[id] = GameObjectTree.get(id).length;
}

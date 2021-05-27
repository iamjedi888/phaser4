import { GameObjectComponent } from './GameObjectComponent';
import { GameObjectWorld } from '../GameObjectWorld';
import { addComponent } from 'bitecs';

export function AddGameObjectComponent (id: number): void
{
    addComponent(GameObjectWorld, GameObjectComponent, id);
}

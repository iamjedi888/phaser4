import { DirtyComponent } from './DirtyComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { addComponent } from 'bitecs';

export function AddDirtyComponent (id: number): void
{
    addComponent(GameObjectWorld, DirtyComponent, id);

    DirtyComponent.transform[id] = 1;
}

import { DirtyComponent } from './DirtyComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { SetDirtyColor } from './SetDirtyColor';
import { SetDirtyTransform } from './SetDirtyTransform';
import { addComponent } from 'bitecs';

export function AddDirtyComponent (id: number): void
{
    addComponent(GameObjectWorld, DirtyComponent, id);

    SetDirtyTransform(id);
    SetDirtyColor(id);
}

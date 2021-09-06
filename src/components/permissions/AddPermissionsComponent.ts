import { GameObjectWorld } from '../../GameObjectWorld';
import { PermissionsComponent } from './PermissionsComponent';
import { addComponent } from 'bitecs';

export function AddPermissionsComponent (id: number): void
{
    addComponent(GameObjectWorld, PermissionsComponent, id);

    PermissionsComponent.data[id].set([ 1, 1, 1, 1, 1, 1, 0, 1, 1 ]);
}

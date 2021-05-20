import { GameObjectWorld } from '../GameObjectWorld';
import { PermissionsComponent } from './PermissionsComponent';
import { addComponent } from 'bitecs';

export function AddPermissionsComponent (id: number): void
{
    addComponent(GameObjectWorld, PermissionsComponent, id);

    PermissionsComponent.willUpdate[id] = 1;
    PermissionsComponent.willUpdateChildren[id] = 1;
    PermissionsComponent.willRender[id] = 1;
    PermissionsComponent.willRenderChildren[id] = 1;
    PermissionsComponent.willCacheChildren[id] = 0;
}

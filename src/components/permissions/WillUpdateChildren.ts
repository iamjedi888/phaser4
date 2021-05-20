import { PermissionsComponent } from './PermissionsComponent';

export function WillUpdateChildren (id: number): boolean
{
    return Boolean(PermissionsComponent.willUpdateChildren[id]);
}

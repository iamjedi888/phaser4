import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function WillUpdate (id: number): boolean
{
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_UPDATE]);
}

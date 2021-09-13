import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function WillUpdate (id: number): boolean
{
    return !!(PermissionsComponent.data[id][PERMISSION.WILL_UPDATE]);
}

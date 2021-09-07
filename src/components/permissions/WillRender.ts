import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function WillRender (id: number): boolean
{
    return !!(PermissionsComponent.data[id][PERMISSION.VISIBLE]) &&
           !!(PermissionsComponent.data[id][PERMISSION.WILL_RENDER]);
}

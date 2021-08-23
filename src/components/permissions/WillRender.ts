import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function WillRender (id: number): boolean
{
    return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE]) && Boolean(PermissionsComponent.data[id][PERMISSION.WILL_RENDER]);
}

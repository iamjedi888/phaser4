import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function HasCustomDisplayList (id: number): boolean
{
    return !!(PermissionsComponent.data[id][PERMISSION.CUSTOM_DISPLAY_LIST]);
}

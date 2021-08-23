import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function GetVisible (id: number): boolean
{
    return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE]);
}

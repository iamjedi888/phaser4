import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function GetVisibleChildren (id: number): boolean
{
    return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE_CHILDREN]);
}

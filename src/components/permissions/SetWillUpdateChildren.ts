import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillUpdateChildren (id: number, value: boolean): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_UPDATE_CHILDREN] = Number(value);
}

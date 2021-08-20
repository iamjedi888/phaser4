import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillUpdateChildren (value: boolean, id: number): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_UPDATE_CHILDREN] = Number(value);
}

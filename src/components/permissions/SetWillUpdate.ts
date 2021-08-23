import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillUpdate (id: number, value: boolean): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_UPDATE] = Number(value);
}

import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillUpdate (value: boolean, id: number): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_UPDATE] = Number(value);
}

import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillColorChildren (id: number, value: boolean): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_COLOR_CHILDREN] = Number(value);
}

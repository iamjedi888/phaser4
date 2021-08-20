import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillColorChildren (value: boolean, id: number): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_COLOR_CHILDREN] = Number(value);
}

import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetCustomDisplayList (id: number, value: boolean): void
{
    PermissionsComponent.data[id][PERMISSION.CUSTOM_DISPLAY_LIST] = Number(value);
}

import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillRender (id: number, value: boolean): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_RENDER] = Number(value);
}

import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillRender (value: boolean, id: number): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_RENDER] = Number(value);
}

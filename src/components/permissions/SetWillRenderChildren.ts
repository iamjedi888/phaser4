import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillRenderChildren (id: number, value: boolean): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_RENDER_CHILDREN] = Number(value);
}

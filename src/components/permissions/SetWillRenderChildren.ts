import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillRenderChildren (value: boolean, id: number): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_RENDER_CHILDREN] = Number(value);
}

import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillTransformChildren (id: number, value: boolean): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_TRANSFORM_CHILDREN] = Number(value);
}

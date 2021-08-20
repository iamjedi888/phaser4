import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillTransformChildren (value: boolean, id: number): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_TRANSFORM_CHILDREN] = Number(value);
}

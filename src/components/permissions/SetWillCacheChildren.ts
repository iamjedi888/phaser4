import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillCacheChildren (value: boolean, id: number): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN] = Number(value);
}

import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function SetWillCacheChildren (id: number, value: boolean): void
{
    PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN] = Number(value);
}

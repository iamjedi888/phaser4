import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

export function WillCacheChildren (id: number): boolean
{
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN]);
}

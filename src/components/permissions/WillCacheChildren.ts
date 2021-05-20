import { PermissionsComponent } from './PermissionsComponent';

export function WillCacheChildren (id: number): boolean
{
    return Boolean(PermissionsComponent.willCacheChildren[id]);
}

import { PermissionsComponent } from './PermissionsComponent';

export function GetVisibleChildren (id: number): boolean
{
    return Boolean(PermissionsComponent.visibleChildren[id]);
}

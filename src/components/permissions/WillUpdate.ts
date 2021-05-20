import { PermissionsComponent } from './PermissionsComponent';

export function WillUpdate (id: number): boolean
{
    return Boolean(PermissionsComponent.willUpdate[id]);
}

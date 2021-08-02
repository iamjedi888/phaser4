import { PermissionsComponent } from './PermissionsComponent';

export function GetVisible (id: number): boolean
{
    return Boolean(PermissionsComponent.visible[id]);
}

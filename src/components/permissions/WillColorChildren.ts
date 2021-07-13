import { PermissionsComponent } from './PermissionsComponent';

export function WillColorChildren (id: number): boolean
{
    return Boolean(PermissionsComponent.willColorChildren[id]);
}

import { PermissionsComponent } from './PermissionsComponent';

export function WillTransformChildren (id: number): boolean
{
    return Boolean(PermissionsComponent.willTransformChildren[id]);
}

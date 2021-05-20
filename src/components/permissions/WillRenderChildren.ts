import { PermissionsComponent } from './PermissionsComponent';

export function WillRenderChildren (id: number): boolean
{
    return Boolean(PermissionsComponent.willRenderChildren[id]);
}

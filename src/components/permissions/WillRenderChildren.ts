import { PermissionsComponent } from './PermissionsComponent';

export function WillRenderChildren (id: number): boolean
{
    return Boolean(PermissionsComponent.visibleChildren[id]) && Boolean(PermissionsComponent.willRenderChildren[id]);
}

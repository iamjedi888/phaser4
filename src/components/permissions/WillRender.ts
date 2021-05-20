import { PermissionsComponent } from './PermissionsComponent';

export function WillRender (id: number): boolean
{
    return Boolean(PermissionsComponent.willRender[id]);
}

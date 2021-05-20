import { IGameObject } from '../../gameobjects/IGameObject';
import { PermissionsComponent } from './PermissionsComponent';

export function WillRenderChildren (gameObject: IGameObject): boolean
{
    return Boolean(PermissionsComponent.willRenderChildren[gameObject.id]);
}

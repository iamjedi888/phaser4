import { IGameObject } from '../../gameobjects/IGameObject';
import { PermissionsComponent } from './PermissionsComponent';

export function WillUpdateChildren (gameObject: IGameObject): boolean
{
    return Boolean(PermissionsComponent.willUpdateChildren[gameObject.id]);
}

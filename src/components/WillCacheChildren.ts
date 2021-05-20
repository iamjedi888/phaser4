import { IGameObject } from '../gameobjects/IGameObject';
import { PermissionsComponent } from './PermissionsComponent';

export function WillCacheChildren (gameObject: IGameObject): boolean
{
    return Boolean(PermissionsComponent.willCacheChildren[gameObject.id]);
}

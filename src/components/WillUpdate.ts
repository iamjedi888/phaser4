import { IGameObject } from '../gameobjects/IGameObject';
import { PermissionsComponent } from './PermissionsComponent';

export function WillUpdate (gameObject: IGameObject): boolean
{
    return Boolean(PermissionsComponent.willUpdate[gameObject.id]);
}

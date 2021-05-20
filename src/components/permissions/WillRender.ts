import { IGameObject } from '../../gameobjects/IGameObject';
import { PermissionsComponent } from './PermissionsComponent';

export function WillRender (gameObject: IGameObject): boolean
{
    return Boolean(PermissionsComponent.willRender[gameObject.id]);
}

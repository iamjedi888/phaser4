import { IGameObject } from '../../gameobjects/IGameObject';
import { PermissionsComponent } from './PermissionsComponent';
import { SetRenderType } from '../hierarchy/SetRenderType';

export function SetWillCacheChildren (value: boolean, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        PermissionsComponent.willCacheChildren[child.id] = Number(value);

        SetRenderType(child.id);
    });

    return children;
}

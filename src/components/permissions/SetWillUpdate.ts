import { IGameObject } from '../../gameobjects/IGameObject';
import { PermissionsComponent } from './PermissionsComponent';

export function SetWillUpdate (value: boolean, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        PermissionsComponent.willUpdate[child.id] = Number(value);
    });

    return children;
}

import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

import { IGameObject } from '../../gameobjects/IGameObject';

export function SetWillUpdate (value: boolean, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        PermissionsComponent.data[child.id][PERMISSION.WILL_UPDATE] = Number(value);
    });

    return children;
}

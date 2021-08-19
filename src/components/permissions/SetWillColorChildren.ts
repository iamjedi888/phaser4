import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

import { IGameObject } from '../../gameobjects/IGameObject';

export function SetWillColorChildren (value: boolean, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        PermissionsComponent.data[child.id][PERMISSION.WILL_COLOR_CHILDREN] = Number(value);
    });

    return children;
}

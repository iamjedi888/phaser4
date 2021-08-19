import { PERMISSION, PermissionsComponent } from './PermissionsComponent';

import { IGameObject } from '../../gameobjects/IGameObject';

export function SetWillRender (value: boolean, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        PermissionsComponent.data[child.id][PERMISSION.WILL_RENDER] = Number(value);
    });

    return children;
}

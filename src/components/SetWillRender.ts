import { IGameObject } from '../gameobjects/IGameObject';
import { PermissionsComponent } from './PermissionsComponent';

export function SetWillRender (value: boolean, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        PermissionsComponent.willRender[child.id] = Number(value);
    });

    return children;
}

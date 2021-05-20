import { IGameObject } from '../gameobjects/IGameObject';
import { PermissionsComponent } from './PermissionsComponent';

export function SetWillRenderChildren (value: boolean, ...children: IGameObject[]): IGameObject[]
{
    children.forEach(child =>
    {
        PermissionsComponent.willRenderChildren[child.id] = Number(value);
    });

    return children;
}

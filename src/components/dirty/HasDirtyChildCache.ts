import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function HasDirtyChildCache (gameObject: IGameObject): boolean
{
    return Boolean(DirtyComponent.childCache[gameObject.id]);
}

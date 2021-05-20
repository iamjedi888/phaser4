import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyChildCache (gameObject: IGameObject): void
{
    DirtyComponent.childCache[gameObject.id] = 1;
}

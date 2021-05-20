import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyAlpha (gameObject: IGameObject): void
{
    DirtyComponent.alpha[gameObject.id] = 1;
}

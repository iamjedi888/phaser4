import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function HasDirtyAlpha (gameObject: IGameObject): boolean
{
    return Boolean(DirtyComponent.alpha[gameObject.id]);
}

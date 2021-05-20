import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyTexture (gameObject: IGameObject): void
{
    DirtyComponent.texture[gameObject.id] = 1;
}

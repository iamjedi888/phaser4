import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function HasDirtyTexture (gameObject: IGameObject): boolean
{
    return Boolean(DirtyComponent.texture[gameObject.id]);
}

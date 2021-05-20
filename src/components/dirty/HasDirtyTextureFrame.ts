import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function HasDirtyTextureFrame (gameObject: IGameObject): boolean
{
    return Boolean(DirtyComponent.textureFrame[gameObject.id]);
}

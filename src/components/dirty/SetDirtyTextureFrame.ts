import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyTextureFrame (gameObject: IGameObject): void
{
    DirtyComponent.textureFrame[gameObject.id] = 1;
}

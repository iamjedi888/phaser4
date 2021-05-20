import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyPostRender (gameObject: IGameObject): void
{
    DirtyComponent.postRender[gameObject.id] = 1;
}

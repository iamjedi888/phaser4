import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function HasDirtyPostRender (gameObject: IGameObject): boolean
{
    return Boolean(DirtyComponent.postRender[gameObject.id]);
}

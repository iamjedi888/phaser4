import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function HasDirtyBounds (gameObject: IGameObject): boolean
{
    return Boolean(DirtyComponent.bounds[gameObject.id]);
}

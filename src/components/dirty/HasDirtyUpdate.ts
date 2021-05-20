import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function HasDirtyUpdate (gameObject: IGameObject): boolean
{
    return Boolean(DirtyComponent.update[gameObject.id]);
}

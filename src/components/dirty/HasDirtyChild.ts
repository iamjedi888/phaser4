import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function HasDirtyChild (gameObject: IGameObject): boolean
{
    return Boolean(DirtyComponent.child[gameObject.id]);
}

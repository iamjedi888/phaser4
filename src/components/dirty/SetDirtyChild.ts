import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyChild (gameObject: IGameObject): void
{
    DirtyComponent.child[gameObject.id] = 1;
}

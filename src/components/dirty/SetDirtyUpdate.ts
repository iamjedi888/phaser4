import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyUpdate (gameObject: IGameObject): void
{
    DirtyComponent.update[gameObject.id] = 1;
}

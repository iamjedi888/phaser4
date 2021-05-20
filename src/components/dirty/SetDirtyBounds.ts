import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyBounds (gameObject: IGameObject): void
{
    DirtyComponent.bounds[gameObject.id] = 1;
}

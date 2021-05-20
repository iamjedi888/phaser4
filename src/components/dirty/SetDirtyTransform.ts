import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyTransform (gameObject: IGameObject): void
{
    DirtyComponent.transform[gameObject.id] = 1;
}

import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function HasDirtyTransform (gameObject: IGameObject): boolean
{
    return Boolean(DirtyComponent.transform[gameObject.id]);
}

import { DirtyComponent } from './DirtyComponent';
import { IGameObject } from '../../gameobjects/IGameObject';

export function GetDirtyFrame (gameObject: IGameObject): number
{
    return DirtyComponent.frame[gameObject.id];
}

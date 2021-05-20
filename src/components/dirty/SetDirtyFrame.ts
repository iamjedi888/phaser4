import { DirtyComponent } from './DirtyComponent';
import { GameInstance } from '../../GameInstance';
import { IGameObject } from '../../gameobjects/IGameObject';

export function SetDirtyFrame (gameObject: IGameObject): void
{
    DirtyComponent.frame[gameObject.id] = GameInstance.getFrame();
}

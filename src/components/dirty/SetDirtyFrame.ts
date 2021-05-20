import { DirtyComponent } from './DirtyComponent';
import { GameInstance } from '../../GameInstance';

export function SetDirtyFrame (id: number): void
{
    DirtyComponent.frame[id] = GameInstance.getFrame();
}

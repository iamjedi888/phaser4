import { DirtyComponent } from './DirtyComponent';

export function IsDirtyFrame (id: number, gameFrame: number): boolean
{
    return DirtyComponent.frame[id] >= gameFrame;
}

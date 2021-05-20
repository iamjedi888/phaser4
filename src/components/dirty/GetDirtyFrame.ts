import { DirtyComponent } from './DirtyComponent';

export function GetDirtyFrame (id: number): number
{
    return DirtyComponent.frame[id];
}

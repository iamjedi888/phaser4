import { DirtyComponent } from './DirtyComponent';

export function SetDirtyUpdate (id: number): void
{
    DirtyComponent.update[id] = 1;
}

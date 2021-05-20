import { DirtyComponent } from './DirtyComponent';

export function SetDirtyChildCache (id: number): void
{
    DirtyComponent.childCache[id] = 1;
}

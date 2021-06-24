import { DirtyComponent } from './DirtyComponent';

export function ClearDirtyChildCache (id: number): void
{
    DirtyComponent.childCache[id] = 0;
}

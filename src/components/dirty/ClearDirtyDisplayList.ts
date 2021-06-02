import { DirtyComponent } from './DirtyComponent';

export function ClearDirtyDisplayList (id: number): void
{
    DirtyComponent.displayList[id] = 0;
}

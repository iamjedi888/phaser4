import { DirtyComponent } from './DirtyComponent';

export function SetDirtyDisplayList (id: number): void
{
    DirtyComponent.displayList[id] = 1;
}

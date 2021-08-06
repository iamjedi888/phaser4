import { DirtyComponent } from './DirtyComponent';

export function SetDirtyColor (id: number): void
{
    DirtyComponent.color[id] = 1;
}

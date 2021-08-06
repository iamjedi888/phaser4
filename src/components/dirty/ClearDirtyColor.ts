import { DirtyComponent } from './DirtyComponent';

export function ClearDirtyColor (id: number): void
{
    DirtyComponent.color[id] = 0;
}

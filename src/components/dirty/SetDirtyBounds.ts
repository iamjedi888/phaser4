import { DirtyComponent } from './DirtyComponent';

export function SetDirtyBounds (id: number): void
{
    DirtyComponent.bounds[id] = 1;
}

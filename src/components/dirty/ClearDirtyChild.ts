import { DirtyComponent } from './DirtyComponent';

export function ClearDirtyChild (id: number): void
{
    DirtyComponent.child[id] = 0;
}

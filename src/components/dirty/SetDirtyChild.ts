import { DirtyComponent } from './DirtyComponent';

export function SetDirtyChild (id: number): void
{
    DirtyComponent.child[id] = 1;
}

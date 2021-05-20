import { DirtyComponent } from './DirtyComponent';

export function SetDirtyPostRender (id: number): void
{
    DirtyComponent.postRender[id] = 1;
}

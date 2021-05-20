import { DirtyComponent } from './DirtyComponent';

export function SetDirtyAlpha (id: number): void
{
    DirtyComponent.alpha[id] = 1;
}

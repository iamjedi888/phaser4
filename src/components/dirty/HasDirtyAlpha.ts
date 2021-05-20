import { DirtyComponent } from './DirtyComponent';

export function HasDirtyAlpha (id: number): boolean
{
    return Boolean(DirtyComponent.alpha[id]);
}

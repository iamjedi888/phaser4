import { DirtyComponent } from './DirtyComponent';

export function HasDirtyChildCache (id: number): boolean
{
    return Boolean(DirtyComponent.childCache[id]);
}

import { DirtyComponent } from './DirtyComponent';

export function HasDirtyUpdate (id: number): boolean
{
    return Boolean(DirtyComponent.update[id]);
}

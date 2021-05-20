import { DirtyComponent } from './DirtyComponent';

export function HasDirtyBounds (id: number): boolean
{
    return Boolean(DirtyComponent.bounds[id]);
}
